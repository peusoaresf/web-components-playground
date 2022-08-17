const template = document.createElement('template')

template.innerHTML = `
  <style>
    .row {
      display: flex;
      flex-direction: row;
    }
    
    .w-100 {
      width: 100%;
    }

    .mx-1 {
      margin: 0px 5px;
    }

    label {
      margin-bottom: 5px;
    }

    .form-input {
      display: flex;
      flex-direction: column;
      padding: 5px 0px;
      width: 100%;
    }

    .form-input-error {
      border-color: red;
    }

    .form-input-feedback {
      color: red;
      font-size: 12px;
      margin-top: 5px;
    }
  </style>

  <div class="form">
    <div class="form-input">
      <label>Card Number*</label>
      <input type="text" class="cardnumber-input" placeholder="1234 1234 1234 1234" />
      <label class="form-input-feedback cardnumber-feedback"></label>
    </div>
  
    <div class="row">
      <div class="form-input">
        <label>Expiry Date*</label>
        <input type="text" class="expirydate-input" placeholder="MM / YY" maxlength="5" />
        <label class="form-input-feedback expirydate-feedback"></label>
      </div>

      <span class="mx-1"></span>

      <div class="form-input">
        <label>CVC*</label>
        <input type="text" class="cvc-input" placeholder="CVC" maxlength="3" />
        <label class="form-input-feedback cvc-feedback"></label>
      </div>
    </div>

    <div class="form-input">
      <label>Cardholder Name</label>
      <input type="text" class="cardholdername-input" />
      <label class="form-input-feedback cardholdername-feedback"></label>
    </div>
  </div>
`

class CreditCardInput extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))    
  }
  
  connectedCallback() {
    this._shadowRoot.querySelector('.cardnumber-input').addEventListener('change', this.cardnumberHandler().bind(this))
    this._shadowRoot.querySelector('.expirydate-input').addEventListener('change', this.expirydateHandler().bind(this))
    this._shadowRoot.querySelector('.cvc-input').addEventListener('change', this.cvcHandler().bind(this))
    this._shadowRoot.querySelector('.cardholdername-input').addEventListener('change', this.cardholdernameHandler().bind(this))
  }

  cardnumberHandler() {
    return this.handler('.cardnumber-feedback', (value) => {
      this.cardnumber = undefined
      
      if (!value) {
        return 'Card number is required'
      }

      this.cardnumber = value
    })
  }

  expirydateHandler() {
    return this.handler('.expirydate-feedback', (value) => {
      this.expirydate = undefined

      if (!value) {
        return 'Expiry date is required'
      }

      if (!value.match(/^\d{2}\/\d{2}$/)) {
        return 'Invalid expiry date format'
      }      

      this.expirydate = value
    })
  }

  cvcHandler() {
    return this.handler('.cvc-feedback', (value) => {
      this.cvc = undefined

      if (!value) {
        return 'CVC is required'
      }

      if (value.length < 3) {      
        return 'CVC should be at least 3 characters long'
      }        

      this.cvc = value
    })
  }

  cardholdernameHandler() {
    return this.handler('.cardholdername-feedback', (value) => {
      this.cardholdername = value
    })
  }
  
  handler(feedbackElement, validate) {
    return ({ target: { value }}) => {
      const feedback = this._shadowRoot.querySelector(feedbackElement)

      const message = validate(value)

      feedback.innerHTML = message || ''

      this.notify()
    }
  }

  notify() {
    const detail = this.isValidState() 
      ? {
        cardnumber: this.cardnumber,
        expirydate: this.expirydate,
        cvc: this.cvc,
        cardholdername: this.cardholdername
      }
      : undefined

    this.dispatchEvent(new CustomEvent('onchange', { detail }))
  }

  isValidState() {
    return this.cardnumber && this.expirydate && this.cvc
  }
}

window.customElements.define('creditcard-input', CreditCardInput)