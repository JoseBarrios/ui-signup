'use strict'

const uiPasswordResetDoc = document._currentScript || document.currentScript;
const uiPasswordResetView = uiPasswordResetDoc.ownerDocument.querySelector('#ui-password-reset-view');

class UIPasswordResetViewController extends HTMLElement {

  static get observedAttributes(){
    return ['action', 'logo', 'email', 'csrf', 'step', 'error'];
  }

  constructor(model){
    super();
		this.state = {};
		this.state.connected = false;
		//Keeps reference of events with bindings (so we can remove them)
		//see: https://stackoverflow.com/questions/11565471/removing-event-listener-which-was-added-with-bind
		this.event = {};
		this.model = model || {};

    const view = document.importNode(uiPasswordResetView.content, true);
    this.shadowRoot = this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(view);
  }

	//Fires when the element is inserted into the DOM. It's a good place to set
	//the initial role, tabindex, internal state, and install event listeners.
	connectedCallback() {

		//Wire views here
    this.$container = this.shadowRoot.querySelector('.container');
    this.$logo = this.shadowRoot.querySelector('#logo');
    this.$form = this.shadowRoot.querySelector('#form');
    this.$csrf = this.shadowRoot.querySelector('#csrf');
    this.$error = this.shadowRoot.querySelector('#error');

    this.$emailContainer = this.shadowRoot.querySelector('#emailContainer');
    this.$email = this.shadowRoot.querySelector('#email');
    this.$instructions = this.shadowRoot.querySelector('#instructions');
    this.$passwordContainer = this.shadowRoot.querySelector('#passwordContainer');
		this.$password = this.shadowRoot.querySelector('#password')
		this.$passwordVerify = this.shadowRoot.querySelector('#passwordVerify')
		this.$submitButton = this.shadowRoot.querySelector('#submitButton')
		this.$emailButtonText = this.shadowRoot.querySelector('#emailButtonText')
		this.$sentButtonText = this.shadowRoot.querySelector('#sentButtonText')
		this.$passwordResetButtonText = this.shadowRoot.querySelector('#passwordResetButtonText')

		//Reference events with bindings
		this.event.change = this._onChange.bind(this);
		if(this.$email){
			this.$email.addEventListener('change', this.event.change);
		}

		this.state.connected = true;
    this._updateView();
	}

	adoptedCallback(){
		console.log('adoptedCallback');
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		switch(attrName){

			case 'action':
				if(newVal !== this.action){ this.action = newVal; }
				break;

			case 'csrf':
				if(newVal !== this.csrf){ this.csrf = newVal; }
				break;

			case 'logo':
				if(newVal !== this.logo){ this.logo = newVal; }
				break;

			case 'email':
				if(newVal !== this.email){ this.email = newVal; }
				break;

			case 'step':
				if(newVal !== this.step){ this.step = newVal; }
				break;

			case 'error':
				if(newVal !== this.error){ this.error = newVal; }
				break;

			default:
				console.warn(`Attribute ${attrName} is not handled, you should probably do that`);
		}
  }

  get shadowRoot(){return this._shadowRoot;}
  set shadowRoot(value){ this._shadowRoot = value}

	get action(){ return this.model.action; }
	set action(value){
		//Check if attribute matches property value, Sync the property with the
		//attribute if they do not, skip this step if already sync
		if(this.getAttribute('action') !== value){
			//By setting the attribute, the attributeChangedCallback() function is
			//called, which inturn calls this setter again.
			this.setAttribute('action', value);
			//attributeChangeCallback() implicitly called
			return;
		}

		this.model.action = value;
		this._updateView(this.$form);
	}

	get csrf(){ return this.model.csrf; }
	set csrf(value){
		//Check if attribute matches property value, Sync the property with the
		//attribute if they do not, skip this step if already sync
		if(this.getAttribute('csrf') !== value){
			//By setting the attribute, the attributeChangedCallback() function is
			//called, which inturn calls this setter again.
			this.setAttribute('csrf', value);
			//attributeChangeCallback() implicitly called
			return;
		}

		this.model.csrf = value;
		this._updateView(this.$csrf);
	}


	get logo(){ return this.model.logo; }
	set logo(value){
		//Check if attribute matches property value, Sync the property with the
		//attribute if they do not, skip this step if already sync
		if(this.getAttribute('logo') !== value){
			//By setting the attribute, the attributeChangedCallback() function is
			//called, which inturn calls this setter again.
			this.setAttribute('logo', value);
			//attributeChangeCallback() implicitly called
			return;
		}

		this.model.logo = value;
		this._updateView(this.$logo);

	}

	get email(){ return this.model.email; }
	set email(value){
		//Check if attribute matches property value, Sync the property with the
		//attribute if they do not, skip this step if already sync
		if(this.getAttribute('email') !== value){
			//By setting the attribute, the attributeChangedCallback() function is
			//called, which inturn calls this setter again.
			this.setAttribute('email', value);
			//attributeChangeCallback() implicitly called
			return;
		}

		this.model.email = value.toLowerCase();
		this._updateView(this.$email);
	}

	get step(){ return this.model.step; }
	set step(value){
		//Check if attribute matches property value, Sync the property with the
		//attribute if they do not, skip this step if already sync
		if(this.getAttribute('step') !== value){
			//By setting the attribute, the attributeChangedCallback() function is
			//called, which inturn calls this setter again.
			this.setAttribute('step', value);
			//attributeChangeCallback() implicitly called
			return;
		}

		this.model.step = parseInt(value);
		this._updateView(this.$step);
	}


	get error(){ return this.model.error; }
	set error(value){
		//Check if attribute matches property value, Sync the property with the
		//attribute if they do not, skip this step if already sync
		if(this.getAttribute('error') !== value){
			//By setting the attribute, the attributeChangedCallback() function is
			//called, which inturn calls this setter again.
			this.setAttribute('error', value);
			//attributeChangeCallback() implicitly called
			return;
		}

		this.model.error = value;
		this._updateView(this.$error);
	}

	_onChange(e){
		switch(e.target){
			case this.$email:
				this.setAttribute('email', e.target.value);
				break;
		}
	}

  _updateView(view='all') {
		//No point in rendering if there isn't a model source, or a view on screen
		if(!this.model || !this.state.connected){ return; }

		switch(view){
			case this.$form:
				this._updateForm();
				break;

			case this.$logo:
				this._updateLogoView();
				break;

			case this.$csrf:
				this._updateCSRF();
				break;

			case this.$email:
				this._updateEmailView();
				break;

			case this.$step:
				this._updateStepView();
				break;

			case this.$error:
				this._updateErrorView();
				break;

			case 'all':
				this._updateForm();
				this._updateCSRF();
				this._updateEmailView();
				this._updateLogoView();
				this._updateStepView();
				this._updateErrorView();
				break;
		}
  }

	_updateForm(){
		if(this.action && this.action !== ''){
			this.$form.action = this.action;
		}
	}

	_updateCSRF(){
		if(this.csrf && this.csrf !== ''){
			this.$csrf.value = this.csrf;
		}
	}

	_updateLogoView(){
		if(this.logo && this.logo !== ''){
			this.$logo.src = this.logo;
		}
	}

	_updateEmailView(){
		if(this.email && this.email !== ''){
			this.$email.value = this.email;
		}
	}

	_updateStepView(){
		if(this.step && this.step !== ''){
			switch(this.step){
				case 1:
					this._hideStepOne(false)
					this._hideStepTwo(true)
					this._hideStepThree(true)
					break;
				case 2:
					this._hideStepOne(true)
					this._hideStepTwo(false)
					this._hideStepThree(true)
					break;
				case 3:
					this._hideStepOne(true)
					this._hideStepTwo(true)
					this._hideStepThree(false)
					break;
				default:
					console.error('Step must be a number between 1-3.')
			}
		}
	}

			//<p id="emailInstructions"> To reset your password, enter the email address you use to signin into your account. </p>
			//<p id="sentInstructions" hidden> Email sent! Check your jose@cognilab.com inbox for instructions from us on how to reset your password.</p>
			//<p id="passwordInstructions" hidden> Enter your new password </p>
	_hideStepOne(hide){
		let show = !hide;
		if(show){
			this.$instructions.innerHTML = 'To reset your password, enter the email address you use to signin into your account.';
			this.$instructions.style.textAlign = 'left';
		}
		this.$emailContainer.hidden = hide;
		this.$emailButtonText.hidden = hide;
	}

	_hideStepTwo(hide){
		let show = !hide;
		if(show){
			this.$instructions.innerHTML = `Check your ${this.email || ''} inbox for instructions from us on how to reset your password`;
			this.$instructions.style.textAlign = 'left';
		}
		this.$sentButtonText.hidden = hide;
		this.$submitButton.disabled = !hide;
	}

	_hideStepThree(hide){
		let show = !hide;
		if(show){
			this.$instructions.innerHTML = 'Enter your new password';
			this.$instructions.style.textAlign = 'center';
		}
		this.$passwordContainer.hidden = hide;
		this.$passwordResetButtonText.hidden = hide;
	}




	_updateErrorView(){
		if(this.model.error && this.model.error !== ''){
			this.$error.style.visibility = 'visible';
			this.$error.classList.add('attention-animation');
			this.$error.innerHTML = this.model.error;
			let animationEndTimer = setTimeout(() => {
				this.$error.classList.remove('attention-animation');
				clearTimeout(animationEndTimer);
			}, 600)
		}
		else {
			this.$error.style.visibility = 'hidden';
			this.$error.classList.remove('attention-animation');
			this.$error.innerHTML = '';
		}
	}

	disconnectedCallback() {
		this._removeEvents()
		this.state.connected = false;
	}

	_removeEvents(){
	}

}

window.customElements.define('ui-password-reset', UIPasswordResetViewController);
