## Web Components Playground

Simple web components playground, no flashy styles yet cause the intention is to showcase how to develop pure web components (no external libraries / frameworks).

The following link redirects to the github pages that hosts the demo and there you can interact with the code presented in this repository ;)

https://peusoaresf.github.io/web-components-playground/

### components / creditcard-input

Simple component that renders 4 inputs (cardnumber, expiry date, cvc and cardholder name) and triggers the ```onchange``` event whenever the user interacts with the form.
The idea is that the component only passes the form data forward when it is in a valid state, any other time and the value dispatched is ```undefined```.
With that said, on the demo page, you shold be able to interact with the form in any way and the submit button should only actually perform the fake ajax call when we have all the data in hands.

_Disclaimer_: both styling and validation rules applied are very basic, the focus was on having a decent starting point that could be expanded with real world requirements as needed.
