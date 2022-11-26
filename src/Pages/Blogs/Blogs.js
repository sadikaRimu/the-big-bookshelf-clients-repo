import React from 'react';

const Blogs = () => {
    return (
        <div className='text-center font-bold'>
            <h2 className='mb-6 font-extrabold'>Blog Section</h2>
            <div className='border-2 border-blue-900 p-5 mb-6 rounded'>
                <h1 className='mb-5'>Question 1: What are the different way to manage a in a react application?</h1>
                <p>Answer: The first thing you will want to do is to draw boxes around every component (and subcomponent) in the mock and give them all names. If you are working with a designer, they may have already done this, so go talk to them! Their Photoshop layer names may end up being the names of your React components!</p>
            </div>
            <div className='border-2 border-blue-900 p-5 mb-6 rounded'>
                <h1 className='mb-5'>Question 2: How does prototypical inheritance work?</h1>
                <p>Answer: The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.J</p>
            </div>
            <div className='border-2 border-blue-900 p-5 mb-6 rounded'>
                <h1 className='mb-5'>Question 3: What is a unit test?Why should we write unit tests?</h1>
                <p>Answer: Unit Testing is a type of software testing where individual units or components of a software are tested.They enable you to catch bugs early in the development process. Automated unit tests help a great deal with regression testing. They detect code smells in your codebase. For example, if you're having a hard time writing unit tests for a piece of code, it might be a sign that your function is too complex.</p>
            </div>
            <div className='border-2 border-blue-900 p-5 mb-6 rounded'>
                <h1 className='mb-5'>Question 4: React vs Angular vs Vue??</h1>
                <p>Answer: Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option..</p>
            </div>
        </div>
    );
};

export default Blogs;