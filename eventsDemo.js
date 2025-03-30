import {EventEmitter} from 'events';

//can create custom events and listen to them - can also use built-in events

const myEmitter = new EventEmitter();

function greetHandler(name)
{
    console.log(`Hi,${name}`);
}

function goodbyeHandler(name)
{
    console.log('Bye,' + name);
}



// Multiple events for same listener

// Register event listeners

myEmitter.on('greet', greetHandler);       //.on(eventName, callbackFunction)
myEmitter.on('goodbye', goodbyeHandler);

// Emit events

myEmitter.emit('greet','swz');   //.emit(eventName) triggers the event and calls all the registered listeners for that event.
myEmitter.emit('goodbye','swz');


// Explanation:

// The string name in .on('greet', ...) defines an event.
// The same string name in .emit('greet') fires that event.


// Error handling

myEmitter.on('error',(err) =>    //passing error because this passes an eventlistener for error event.
{
    console.error('Error Occured:',err);
})

// Simulate Error

myEmitter.emit('error',new Error('Something went wrong'));