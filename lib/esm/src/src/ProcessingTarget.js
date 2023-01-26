///ProcessingTarget.js

import * as MY from '@catsums/my';

export class ProcessingTarget extends EventTarget{
	FPS = 12;
	targetName = MY.randomID('[ProcessingTarget:',']');
	connectId = MY.randomID('ConnectID:');
	// onProcessTimer; onPhysicsProcessTimer;
	_connectedObjects = [];
	_signals = {};

	_startSysTime = 0;
	_lastSysTime = 0;_currSysTime = 0;
    _deltaSysTime = 0; _fixedDeltaSysTime = 0;
	_initDeltaSysTime = 0;
	_elapsedDeltaTime = 0;
	_elapsedFixedDeltaTime = 0;

	_frameTolerance = Math.sqrt(Math.E)/1000;

	_logs = false;

	_active = false; _isReady = false;

	_animFrame;

    get deltaTime(){ return this._deltaSysTime; }
    get fixedDeltaTime(){ return this._fixedDeltaSysTime; }
    get frameTime(){ return MY.safeDivide(1, this.FPS); }
	get elapsedTime(){ return this._elapsedDeltaTime; }
	get elapsedFixedTime(){ return this._elapsedFixedDeltaTime; }

	constructor(opts={}){
		super();

        this.FPS = opts?.FPS || this.FPS;
        this._frameTolerance = opts?.frameTolerance || this._frameTolerance;

		if(opts?.active){
			this.activate();
		}
	}

	onPreProcess(timestamp){
        try{
            this._animFrame = requestAnimationFrame(this.onPreProcess.bind(this));

            if(!this._isReady){
                this._isReady = true;
                this.onReady();
            }

            this._currSysTime = window.performance.now();
            // this._currSysTime = timestamp||0;

            let fixedDelta = MY.safeDivide(1, this.FPS);

			this._deltaSysTime = (
                ( this._currSysTime - this._lastSysTime ) / 1000 
            );
            this._initDeltaSysTime += (this._deltaSysTime);
            
            this.onProcess(this.deltaTime);
			this._elapsedDeltaTime += (this.deltaTime);

            if((this._initDeltaSysTime) >= (this.frameTime)){
				this._fixedDeltaSysTime = this._initDeltaSysTime;
				this.onPhysicsProcess(this.fixedDeltaTime);

				this._elapsedFixedDeltaTime += (this.fixedDeltaTime);

				this._initDeltaSysTime = 0;
			}

            this._lastSysTime = this._currSysTime;

            
        }catch(err){
            console.log(err);
        }
	}

	onReady(){ /*  */ }

	onProcess(delta){ /*  */ }

	onPhysicsProcess(delta){ /*  */ }

	createSignal(name, ...vars){
		let varsObj = {};
		for(let vvar of vars)
			varsObj[vvar] = null;
		let event = new CustomEvent(name,{
			detail:varsObj
		});
		event.data = varsObj;
		this._signals[name]=event;
		if(this._logs) console.log('Signal '+name+' in '+this.targetName+' created');
	}

	removeSignal(name){
		if(this._signals.hasOwnProperty(name)){
			this._signals[name] = null;
			if(this._logs) console.log('Signal '+name+' in '+this.targetName+' removed');
		}
	}

	emitSignal(name, vars={}, elems=this._connectedObjects){
		let event = null;
		if(!this._signals.hasOwnProperty(name)){
			let varKeys = Object.keys(vars);
			this.createSignal(name,...varKeys);
		}
		event = this._signals[name];

		for(let kkey of Object.keys(vars))
			event.data[kkey] = vars[kkey];
		for(let elem of elems){
			elem.dispatchEvent(event);
		}
	}

	connectElement(element){
		if(element && element instanceof EventTarget){
			let identifier = '';
			if(!('connectId' in element)){
				element.connectId = MY.randomID('ConnectID:');
				if(element instanceof HTMLElement){
					element.dataset.connectId = element.connectId;
				}
			}
			if(element instanceof Element){
				if(String(element.id)){
					identifier+=' id('+element.id+')';
				}
				if(String(element.className)){
					identifier+=' class('+element.className+')';
				}
				if(String(element.localName)){
					identifier+=' tag('+element.localName+')';
				}
				else{
					identifier+=' tagName('+element.tagName+')';
				}
			}
			identifier += ' ('+element.connectId+')';
			
			if(!MY.hardPush(this._connectedObjects,element,['connectId'])){
				if(this._logs) console.log('Element '+identifier+' is already connected');
				return false;
			}
			else{
				if(this._logs) console.log('Element '+identifier+' connected!');
				return true;
			}
		}
		else{
			if(this._logs) console.log('Element was not valid');
		}
		return false;
	}

	disconnectElement(element){
		if(element && element instanceof EventTarget){
			let identifier = ''; let isDisconnected = false;
			for(let i=0;i < this._connectedObjects.length;i++){
				let elem = this._connectedObjects[i];
				if(elem.connectId===element.connectId){
					this._connectedObjects.splice(i,1);
					isDisconnected = true;
				}
			}
			if(element instanceof Element){
				if(String(element.id)){
					identifier+=' id: '+element.id;
				}
				if(String(element.className)){
					identifier+=' class: '+element.className;
				}
				if(String(element.localName)){
					identifier+=' tag: '+element.localName;
				}
				else{
					identifier+=' tagName:'+element.tagName;
				}
			}
			identifier += ' ('+element.connectId+')';
			
			if(!isDisconnected){
				if(this._logs) console.log('Element '+identifier+' was not connected/already disconnected');
				return false;
			}
			else{
				if(this._logs) console.log('Element '+identifier+' successfully disconnected!');
				return true;
			}
		}
		else{
			if(this._logs) console.log('Element was not valid');
		}
		return false;
	}

	disconnectAllElements(){
		for(let el of this._connectedObjects){
			this.disconnectElement(el);
		}
	}

	connectElements(elementArr){
		if(elementArr && elementArr instanceof Array){
			for(let el of elementArr){
				this.connectElement(el);
			}
		}
	}

	isConnectedToElement(element){
		return MY.findItem(this._connectedObjects,element);
	}
	logsOn(){
		this._logs = true;
	}
	logsOff(){
		this._logs = false;
	}

	isActive(){
		return this._active;
	}

	activate(){
		if(this.isActive()) return;
		this._active = true;

		this._lastSysTime = window.performance.now();
		this._startSysTime = this._lastSysTime;
	
		this._elapsedDeltaTime = 0;
		this._elapsedFixedDeltaTime = 0;

		this.onPreProcess(this._lastSysTime);
		
	}
	deactivate(){
		if(!this.isActive()) return;
		this._active = false;

		if(this._animFrame){
            cancelAnimationFrame(_animFrame);
            _animFrame = null;
        }
	}
}