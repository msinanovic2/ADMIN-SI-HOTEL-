
import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { mount, shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { act } from "react-dom/test-utils";

import { render } from "@testing-library/react";
import App2 from "./App2";
import Login from './Login'
import Business from './Buisness'
import HomePage from './HomePage'



configure({adapter: new Adapter()});

describe("Test", () => {

  // Ovo samo dodaj ne pitaj ništa
  beforeAll(() => {  
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test("Is there Button",()=>{
    const wrapper = mount(<App2></App2>);
    expect(wrapper.find('button')).toHaveLength(1);

  }) 
 
  test("Login should be unsuccessful", () => {

    const wrapper = mount(<App2></App2>);

    let usernameInput =  wrapper.find("input").first().instance();
    let passwordInput =  wrapper.find("input").at(1).instance();

    usernameInput.value = "root";
    passwordInput.value = "pogresan pass";

    //wrapper.find("input").first().instance().value = "jasmin";
    //wrapper.find("input").at(1).instance().value="novaa";

    console.log("Username: ", JSON.stringify(wrapper.find("input").first().instance().value));
    console.log("Password: ", JSON.stringify(wrapper.find("input").at(1).instance().value));

    wrapper.find('button').simulate('click');

    expect(usernameInput).toBeVisible();
  });

  
  test("Preview H1 for Business", () => {

    const wrapper = mount(<Business></Business>);

    let header = wrapper.find('h2').first().instance()
    expect(header).toBeVisible();
  });

  
  test("3 buttons", () => {
    const wrapper = mount(<HomePage></HomePage>);
    expect(wrapper.find("button")).toHaveLength(3);
  });
  test("Not Logged In", () => {
    const wrapper = mount(<App2></App2>);
    expect(wrapper.find("a")).toHaveLength(0);
  });

});
