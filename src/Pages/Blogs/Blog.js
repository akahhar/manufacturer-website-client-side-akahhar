import React from "react";
import "./Blog.css";
const Blog = () => {
  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20">
      <h4 className="mt-4">
        14.1 How will you improve the performance of a React Application?
      </h4>
      <p className="mb-3">
        <span className="text-green-500">Answer :</span>
        <ul>
          <li>1.Keeping component state local where necessary.</li>
          <li>
            2.Memoizing React components to prevent unnecessary re-renders.
          </li>
          <li>
            3.Code-splitting in React using dynamic import() Windowing or list
          </li>
          <li>4.virtualization in React. Lazy loading images in React.</li>
          <li>
            5.To optimize React rendering, you need to make sure that components
            receive only necessary props.
          </li>
        </ul>
      </p>
      <h4 className="mt-4">
        14.2 What are the different ways to manage a state in a React
        application?
      </h4>
      <p className="mb-3">
        <span className="text-green-500">Answer :</span>
        <ul>
          <li>
            1. Using Redux : Redux is an open-source JavaScript library for
            managing and centralizing application state.
          </li>
          <li>2.Data State.</li>
          <li>3.Control State</li>
          <li>4.Session State.</li>
          <li>5.Location State..</li>
        </ul>
      </p>
      <h4 className="mt-4">14.3 How does prototypical inheritance work?</h4>
      <p className="mb-3">
        <span className="text-green-500">Answer :</span>
        <span>
          The Prototypal Inheritance is a feature in javascript used to add
          methods and properties in objects. It is a method by which an object
          can inherit the properties and methods of another object.
          Traditionally, in order to get and set the [[Prototype]] of an object,
          we use Object. getPrototypeOf and Object
        </span>
      </p>
      <h4 className="mt-4">
        14.4 Why you do not set the state directly in React. For example, if you
        have const [products, setProducts] = useState([]). Why you do not set
        products = [...] instead, you use the setProducts
      </h4>
      <p className="mb-3">
        <span className="text-green-500">Answer :</span>
        <span>
          When you directly update the state, it does not change this. state
          immediately. Instead, it creates a pending state transition, and
          accessing it after calling this method will only return the present
          value. You will lose control of the state across all components.
        </span>
      </p>
      <h4 className="mt-4">
        14.6 What is a unit test? Why should write unit tests?
      </h4>
      <p className="mb-3">
        <span className="text-green-500">Answer :</span>
        <span>
          UNIT TESTING is a type of software testing where individual units or
          components of a software are tested. The purpose is to validate that
          each unit of the software code performs as expected. Unit Testing is
          done during the development (coding phase) of an application by the
          developers. Unit Tests isolate a section of code and verify its
          correctness. A unit may be an individual function, method, procedure,
          module, or object.
          <br></br>
          Unit testing is an important step in the development process, because
          if done correctly, it can help detect early flaws in code which may be
          more difficult to find in later testing stages.
        </span>
      </p>
    </div>
  );
};

export default Blog;
