# Target Observers
 Observers that can be used for checking specific changes in objects. This mainly consists of a Transform Observer and a Collision Observer for DOM Elements.

- `ProcessingTarget`
- `TransformObserver`
- `CollisionObserver`


## Installing with NPM

```shell
npm install @catsums/targetobservers
```

## Installing with CDN

```html
<!-- For Production -->
<script src="unpkg.com/@catsums/target-observers@latest/lib/umd/index.min.js"></script>
<!-- For Development -->
<script src="unpkg.com/@catsums/target-observers@latest/lib/umd/index.dev.js"></script>
```

You can use ESM imports on these:
```js
import {ProcessingTarget, TransformObserver, CollisionObserver} from "@catsums/targetobservers";
```
You can also use CommonJS syntax:
```js
const {ProcessingTarget, TransformObserver, CollisionObserver} = require("@catsums/targetobservers");
```

You may also use a CDN for which default library name is `TargetObservers` :
```html
<script src="unpkg.com/@catsums/targetobservers@latest/lib/umd/index.min.js"></script>
<script>
	//after adding <script> tag with cdn link
	
	const TransformObserver = TargetObservers.TransformObserver;
	const CollisionObserver = TargetObservers.CollisionObserver;

</script>
```

## ProcessingTarget

**IT IS IMPORTANT TO KNOW** that all the observers here inherit from this class called ProcessingTarget, which inherits from EventTarget of the DOM API. This means that you can add event listeners to them and have them subscribe other EventTargets (such as DOM Elements and Nodes) to it. This is why the ProcessingTarget will have methods such as `connect()` and `disconnect()` to reflect the Event Handler pattern.

### Why ProcessingTarget?

ProcessingTargets have in built 'timer' that runs on the frame thread of the script based on the `requestFrameAnimation()` method in order to handle its internal processes. This is to allow it to loop a certain piece of code based on a time frame every given milliseconds. It allows splits these processes into normal process and physics process. This would be similar to the **Monobehavior** `OnProcess()` and `OnFixedProcess()` from Unity, or the **Node** `_process()` and `_physics_process()` from Godot.

Therefore, this means that the observers that inherit from this are processing per frame (based on the FPS) for any changes in the elements they are observing.

Since it is running on the frame thread of the script, it lets the run code process much faster with less lag (as compared to using setIntervals or setTimeouts). However this may not guarantee that the processing target can run without slowing down the client.
If you do wish to only run the processing code at certain times with your own control and not based on the loop, you may deactivate the ProcessingTarget, which disables the loop. 

By default, these are deactivated as to prevent ProcessingTargets from running automatically out of control. The other observers are built with methods to check for updates manually, which can be used for managing.

### Instance Parameters

##### `target.FPS : number`
The fixed rate of the target in Frames per Second

##### `target.targetName : string`
The target's registered name, which acts an id and unique identifier.

##### `target.connectId : string`
The target's connectId to be referenced when it connects to other ProcessingTargets.

##### `target.deltaTime : number`
The current time interval for the ProcessingTarget. This is based on the speed of the system, rather than the FPS and is used by `OnProcess()`

##### `target.fixedDeltaTime : number`
The current fixed time interval for the ProcessingTarget. This is based on the FPS, rather than the speed of the system and is used by `OnPhysicsProcess()`

##### `target.frameTime : number`
Returns the time interval of the FPS rate. This is basically `1/FPS`.

##### `target.elapsedTime : number`
The elapsed time accumulated for every `OnProcess()` run in the ProcessingTarget since activation. If deactivated, this will reset to 0.

##### `target.elapsedFixedTime : number`
The elapsed fixed time accumulated for every `OnPhysicsProcess()` run in the ProcessingTarget since activation. If deactivated, this will reset to 0.

### Instance Methods

##### `new ProcessingTarget(opts:Object{FPS:number,active:boolean,frameTolerance:number})`
Creates a processing target based on a certain FPS, to set if it is meant to be active on creation and the frame tolerance for the processing delta value.

##### `target.createSignal(name:string, ...vars:string[]) : void`
Creates a signal for the target to emit to the subscribed elements. When vars are passed, this acts as variables that can be passed into the emitter.

##### `target.removeSignal(name:string) : void`
Removes the signal from the target and clears out any existing events associated with the signal.

##### `target.emitSignal(name:string, vars:Object={}, elems:EventTarget[]=null) : void`
Emits a signal with passed vars as the event's detail to all subscribed elements. If the elems parameter is blank, it will send to all connected elements. If it is specified, it will choose those elements to dispatch the events to.

##### `target.connectElement(elem:EventTarget) : boolean`
Connects an Element or EventTarget to the ProcessingTarget for it to broadcast signals to. Returns true if successfully connected.

##### `target.disconnectElement(elem:EventTarget) : boolean
Disconnects an Element or EventTarget from the ProcessingTarget. Returns true if element was connected before and was successfully disconnected.

##### `target.connectElements(elems:EventTarget[]) : void`
Connects all elements specified in the array.

##### `target.disconnectAllElements(elem:EventTarget) : void`
Disconnects all connected elements from the target.

##### `target.isConnectedToElement(elem:EventTarget) : boolean`
Returns true if the element is currently connected to the target.

##### `target.isActive() : boolean`
Returns true if the target is currently activated and running processing.

##### `target.activate() : void`
Activates the processing of the ProcessingTarget.

##### `target.deactivate() : boolean`
Switches off the processing of the ProcessingTarget.



## TransformObserver
A class that observes changes in the position, rotation and scale of the DOM Element. This works by not only being able to observe the bounding client rect of the Element, but the offset rect and transforms from CSS as well.

```js
import {TransformObserver} from "@catsums/targetobservers";

let obs = new TransformObserver((entries, obs)=>{
	for(let entry of entries){
		let changes = entry.changes;
		console.log(entry.target);
		console.log(changes);
	}
},{
	FPS: 6, precision: 0.001
});

let elem = document.getElementById("theElementOfSurprise");

elem.addEventListener("transformChange",(e)=>{
	let entryChanges = e.details.changes;
	//this can also be used to get the changes of the object
});

obs.observe(elem,{
	//use boolean flags to set individual sub settings to true of false
	offsetrect:{globalposition:true, size:false},
	//or use array of string names of those sub settings to set them to true
	transform:['scale','rotation','translation'],
	//or set to true for all sub settings under this setting
	matrixtransform:true,
});

//observer is deactivated by default, meaning it will not observe on the frame thread per frametime until it is activated.
obs.activate();


```

This can observe in several settings:
- `boundingrect`:
	Observes the `globalposition` and `localposition` of the rect, along with the `size`.
	- Global position is the normal position from `getBoundingRect()` of the Element, which is in relation to the viewport.
	- Local position is the result position from the parent global position subtracted from the current global position.
	- Size is the size of the rect that covers the element.
- `offsetrect`:
	Observes the `globalposition` and `localposition` of the rect, along with the `size`. This is used to observe the rect of the Element before any CSS transforms.
	- Local position is the normal position from `offset` properties of the Element, which retains the rect of the element before any CSS transforms.
	- Global position is the local position added with the global position of the parent in relation to the viewport.
	- Size is the size of the rect that covers the element before any CSS transforms.
- `localtransform`:
	Observes the transform of the Element based on the recent independant CSS transforms (i.e. rotate, scale and translate properties). It translates these into a Transform2 object which determines change in `position`, `scale`, `rotation` and `anchor`.
- `localmatrixtransform`:
	Observers the transform based on the older matrix CSS transforms (i.e. the ones that use transform property). It translates these into a Transform2 object which determines change in `position`, `scale`, `rotation` and `anchor`. (NB: The skew is not a parameter as it can be observed via the scale and rotation changes).
- `globaltransform`:
	Observers the transform based on the independant CSS transform properties in relative to the ancestor's independant CSS transforms as well. It translates these into a Transform2 object which determines change in `position`, `scale`, `rotation` and `anchor`.
- `globalmatrixtransform`:
	Observers the transform based on the CSS matrix transform property in relative to the ancestor's matrix transforms as well. It translates these into a Transform2 object which determines change in `position`, `scale`, `rotation` and `anchor`. (NB: The skew is not a parameter as it can be observed via the scale and rotation changes).

### Events

##### `transformChange`
This event is emitted when there is a change in the observed transform of the element and the element listening to this event will receive the changes information. The detail name is `changes`.

### Instance Methods

##### `new TransformObserver(callback:Function, opts:Object{FPS:number, precision:number, active:boolean}`
Creates the transform observer in the same style as the other observer APIs. It takes in a callback function that is run for everytime a series of entries are detected and the options to set up the observer.

###### Callback Function: `function(entries:Object[], observer:TransformObserver) : void`
The callback function takes in an array of objects that represent entries from the observer and the observer itself for reference. This is used to handle the entries at a given moment.

##### `obs.observe(element:Element, options:Object) : Object`
This observers a certain element based on the options passed in. This returns a proxy object (not a JS Proxy from the Proxy API, but more of an adapter) which is used to show the current state of the element's observable properties.
The options parameter may be in the form of the following:

######  `options : Object`
This is the base form which will have the main setting flags. Each main setting flag can be either:
- an object which has the sub settings as keys and their flags as boolean 
```js
	let options = {
		offsetrect: {
			globalposition: true,
			localposition: false, //putting false is optional
			size: true,
		}
	};
```
- an array which contains the needed sub settings
```js
	let options = {
		offsetrect: ['globalposition', 'size']
		/* same as
		offsetrect: {
			globalposition: true,
			localposition: false
			size: true,
		}
		*/
	};
```
- a boolean value to show that all sub settings are flagged true or flagged false
```js
	let options = {
		offsetrect: true
		/* same as
		offsetrect: {
			globalposition: true,
			localposition: true
			size: true,
		}
		*/
	};
```

Refer to the settings above to see all the possible settings passable in the options, along with their explanations.

##### `obs.observe(elements:Element[], options:Object) : Object[]`
If an array is passed on the elements parameter, this observers an array of elements using the passed options and returns an array of proxies in respect to the elements passed.

##### `obs.disconnect(elements:Element) : void`
Not to be confused with `obs.disconnectElement()`, this disconnects the element from the target entirely as well as making it stop observing it.

##### `async obs.checkUpdates(elements:Element[]) : void`
This checks for any updates for the elements passed, checking if they are being observed and if so, checking if there are any changes based on their proxies and options. This is done asynchronously to let it run on its own thread and to not interfere with currently processing entries.

### TransformObserver Proxy
This is a JS object that contains the observed information of the Element. It contains keys that represent event passed option, however instead of containing a flag, it contains relevant JSON information for that parameter e.g.
the bounding rect localposition stores the JSON of a Vector2.

However all proxies will contain the following parameter(s):

##### `proxy.id : string`
This is the connectId of the element.

All proxies will contain at least one of the following parameter(s):

##### `proxy.boundingrect : Object`
Information about the current bounding rect
##### `proxy.offsetrect : Object`
Information about the current offset rect
##### `proxy.localtransform : Object`
Information about the local transform based on CSS independant transforms
##### `proxy.globaltransform : Object`
Information about the global transform based on CSS independant transforms
##### `proxy.localmatrixtransform : Object`
Information about the local transform based on CSS transform matrix property
##### `proxy.globalmatrixtransform : Object`
Information about the global transform based on CSS transform matrix property

### TransformObserver Entry
A JS Object that has information about the changes of an element observed by the observer.

All entries will contain the following parameter(s):

##### `entry.id : string`
The connectId of the element
##### `entry.target : Element`
A reference to the element itself
##### `entry.changes : Object`
An object that contains the list of changes in key-value pairs in the form of:
```js
entry.changes[property_here] = {
	old: old_value_in_JSON,
	new: new_value_in_JSON
}
/* e.g.
entry.changes.globalposition = {
	old: {x:9, y:10}, new: {x:4,y:3}
}
*/
```
##### `entry.process : Object`
Process information that shows the `processTime` at which it was processed, `logTime` at which it was processed and `timeTaken` for the entry to change per process.


## CollisionObserver
A class that observes collisions between DOM Elements based on their shapes.  This works by not only being able to observe the **bounding client rect** of the Element, but the **offset rect**,  the **clip-path** and **shape-outside**. These work as well with transforms considered, as well as with transforms excluded.

```js
import {CollisionObserver, CollisionType} from "@catsums/targetobservers";

let obs = new CollisionObserver((entries, obs)=>{
	for(let entry of entries){
		let collisions = entry.collisions;
		console.log(entry.target);
		console.log(collisions);
	}
},{
	FPS: 6, precision: 0.001, tolerance: 1
});

let elem = document.getElementById("theElementOfSurprise");
let elemground = document.getElementById("theFloor");

elem.addEventListener("collisionIn collisionChange",(e)=>{
	let entryCollisionData = e.details.collisionData;
	//this can also be used to get the collisiondata of the object
});

obs.observe(elem,{
	rects:{
		boundingrect: true, transformrect:true, clippath:true
	},
	//can also be an array like rects:['boundingrect','clippath','transformrect']
	collisionLayers: ['item','element'],
	targetLayers: ['ground','item'],
	tolerance: 0.001
});
obs.observe(elem,{
	rects:['boundingrect'],
	collisionLayers: ['ground'], targetLayers: [],
});

//observer is deactivated by default, meaning it will not observe on the frame thread per frametime until it is activated.
obs.activate();


```

This can observe in several settings:

- `rects`:
	This can observe between several rects (normally just the shapes) of the element based on its shape type.
	- `boundingrect` - checks collisions based on global bounding client rect
	- `offsetrect` - checks based on the global offset rect without considering transforms
	- `transformrect` - checks based on the global transform rect. This considers the angle of rotations as well, compared to boundingrect which does not.
	- `clippath` - checks based on the clip-path of the element. This also considers the angle of rotations and other transformations.
	- `shapeoutside` - checks based on the shape-outside of the element and considers transforms as well.
- `collisionLayers`:
	This is an array of layers as strings which the element will be registered as a part of, such that any element meant to detect the element with it must target that layer.
- `targetLayers`:
	This is an array of layers as strings which the element will detect collisions with other elements in the layers specified.
- `tolerance`:
	While the observer has a set defined tolerance, custom tolerance can be set for specific elements.

### CollisionType
This is an enum for entries which shows the collision type.

`CollisionType.IN` shows entering collision
`CollisionType.CHANGE` shows change in the collision intersection
`CollisionType.OUT` shows exiting collision

### Events

##### `collisionIn`
This event is emitted when there is a new collision with the element and another element in the target layer. The detail passed will be the `collisionData` containing the element being collided with, the layers it resides in and the intersection points.
##### `collisionChange`
This event is emitted when there is a change in an existing collision with the element and another element in the target layer. The detail passed will be the `collisionData` containing the element being collided with, the layers it resides in and the new intersection points.
##### `collisionOut`
This event is emitted when there is a collision with the element and another element in the target layer that has been removed. The detail passed will be the `collisionData` containing the element being collided with, the layers it resides in and no intersection points.

### Instance Methods

##### `new CollisionObserver(callback:Function, opts:Object)`
Creates the collision observer in the same style as the other observer APIs. It takes in a callback function that is run for everytime a series of entries are detected and the options to set up the observer.

###### Callback Function: `function(entries:Object[], observer:CollisionObserver) : void`
The callback function takes in an array of objects that represent entries from the observer and the observer itself for reference. This is used to handle the entries at a given moment.

##### `obs.observe(element:Element, options:Object) : Object`
This observers a certain element based on the options passed in. This returns a proxy object (not a JS Proxy from the Proxy API, but more of an adapter) which is used to show the current state of the element's observable properties.
The options parameter may be in the form of the following:

######  `options : Object`
This is the base form which will have the main setting flags for the rect.
- an object which has the sub settings as keys and their flags as boolean 
```js
	let options = {
		rect: {
			boundingrect: true,
			clippath: false, //putting false is optional
			shapeoutside: true,
		}
	};
```
- an array which contains the needed sub settings
```js
	let options = {
		offsetrect: ['shapeoutside', 'clippath']
		/* same as
		offsetrect: {
			shapeoutside:true, clippath: true
		}
		*/
	};
```

Refer to the settings above to see all the possible settings passable in the options, along with their explanations.

The settings should also contain the `collisionLayers : string[]`, the `targetLayers : string[]` and optionally the `tolerance : number`.

##### `obs.observe(elements:Element[], options:Object) : Object[]`
If an array is passed on the elements parameter, this observers an array of elements using the passed options and returns an array of proxies in respect to the elements passed.

##### `obs.disconnect(elements:Element) : void`
Not to be confused with `obs.disconnectElement()`, this disconnects the element from the target entirely as well as making it stop observing it.

##### `async obs.checkUpdates(elements:Element[]) : void`
This checks for any updates for the elements passed, checking if they are being observed and if so, checking if there are any changes based on their proxies and options. This is done asynchronously to let it run on its own thread and to not interfere with currently processing entries.

### CollisionObserver Proxy
This is a JS object that contains the observed information of the Element. It contains keys that represent event passed option, however instead of containing a flag, it contains relevant JSON information for that parameter

However all proxies will contain the following parameter(s):

##### `proxy.id : string`
This is the connectId of the element.

##### `proxy.rect : Object`
Information about the select rect shapes that need to have their collisions checked with
##### `proxy.collision.layers : string[]`
The collision layers that the element is a part of.
##### `proxy.collision.targetLayers : string[]`
The collision layers that the element will detect collisions with
##### `proxy.tolerance : number`
The custom tolerance that the element will use to determine collisions.
##### `proxy.currentCollisions : Object[]`
The current colliding elements it has with but as their collisionData.

### CollisionObserver Entry
A JS Object that has information about the changes of an element observed by the observer.

All entries will contain the following parameter(s):

##### `entry.id : string`
The connectId of the element
##### `entry.target : Element`
A reference to the element itself
##### `entry.collisions : Object[]`
An object array that contains the collisionData of the element, showing all the current collisions with changes in their intersection, or any new collisions, or any collisions that got removed.
```js
entry.collisions[index] = {
	targetID: string, //connectId of element target
	target: Element, //actual target element itself
	rect: string, //intersection shape
	type: CollisionType, //IN, OUT or CHANGE
	layers: string[], //layers of target
	intersect: Object[], //the array of points forming polygon intersection
}
/* e.g.
entry.collisions[0] = {
	targetID: "01236969",
	target: elem,
	rect: "clippath",
	type: CollisionType.IN,
	layers: ['ground', 'static'],
	intersect: [
		{x:3,y:4},{x:5.556,y:6.1}, {x:0.1,y:2.6}
	],
}
*/
```
##### `entry.process : Object`
Process information that shows the `processTime` at which it was processed, `logTime` at which it was processed and `timeTaken` for the entry to change per process.