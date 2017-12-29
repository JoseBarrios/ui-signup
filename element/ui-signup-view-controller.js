'use strict'

const uiSignupDoc = document._currentScript || document.currentScript;
const uiSignupView = uiSignupDoc.ownerDocument.querySelector('#ui-signup-view');

class UISignupViewController extends HTMLElement {

	static get observedAttributes(){
		return ['action', 'logo', 'given-name', 'family-name', 'email', 'no-password', 'button-text', 'csrf', 'error'];
	}

	constructor(model){
		super();
		this.state = {};
		this.state.connected = false;
		//Keeps reference of events with bindings (so we can remove them)
		//see: https://stackoverflow.com/questions/11565471/removing-event-listener-which-was-added-with-bind
		this.event = {};
		this.model = model || {};

		const view = document.importNode(uiSignupView.content, true);
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

		this.$content = this.shadowRoot.querySelector('slot').assignedNodes()[0].children;
		this.$error = this.shadowRoot.querySelector('#error');
		this.$inputContainer = this.shadowRoot.querySelector('#inputContainer');
		this.$buttonText = this.shadowRoot.querySelector('#buttonText');
		this.$givenName = this.shadowRoot.querySelector('#givenName');
		this.$familyName = this.shadowRoot.querySelector('#familyName');
		this.$email = this.shadowRoot.querySelector('#email');
		this.$password = this.shadowRoot.querySelector('#password')

		//Reference events with bindings
		this.event.submit = this._onSubmit.bind(this);
		this.event.change = this._onChange.bind(this);

		if(this.$form){
			this.$form.addEventListener('submit', this.event.submit);
		}

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

			case 'no-password':
				if(newVal !== this.noPassword){ this.noPassword = newVal; }
				break;

			case 'button-text':
				if(newVal !== this.buttonText){ this.buttonText = newVal; }
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

	get noPassword(){ return this.model.noPassword; }
	set noPassword(value){
		//Check if attribute matches property value, Sync the property with the
		//attribute if they do not, skip this step if already sync
		if(this.getAttribute('no-password') !== value){
			//By setting the attribute, the attributeChangedCallback() function is
			//called, which inturn calls this setter again.
			this.setAttribute('no-password', value);
			//attributeChangeCallback() implicitly called
			return;
		}

		let casted = value === 'true';
		this.model.noPassword = casted;
		this._updateView(this.$password);
	}

	get buttonText(){ return this.model.buttonText; }
	set buttonText(value){
		//Check if attribute matches property value, Sync the property with the
		//attribute if they do not, skip this step if already sync
		if(this.getAttribute('button-text') !== value){
			//By setting the attribute, the attributeChangedCallback() function is
			//called, which inturn calls this setter again.
			this.setAttribute('button-text', value);
			//attributeChangeCallback() implicitly called
			return;
		}

		this.model.buttonText = value;
		this._updateView(this.$buttonText);
	}

	//AS long as contents have name and value attribute, it will submit them
	_onSubmit(e){
		for (var i = 0; i < this.$content.length; i++) {
			let $elem = this.$content[i];
			if($elem.name){
				let $input = document.createElement("input");
				$input.value = $elem.value;
				$input.name = $elem.name;
				$input.type = 'hidden';
				this.$form.appendChild($input);
			}
		}
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

			case this.$password:
				this._updatePasswordView();
				break;

			case this.$buttonText:
				this._updateButtonTextView();
				break;

			default:
				this._updateForm();
				this._updateCSRF();
				this._updateEmailView();
				this._updateLogoView();
				this._updateStepView();
				this._updateErrorView();
				this._updatePasswordView();
				this._updateButtonTextView();

				if(this.$givenName.value){ this.$familyName.focus() }
				if(this.$familyName.value){ this.$email.focus() }
				if(this.$email.value && !this.noPassword){ this.$password.focus() }
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
			this.$logo.style.display = 'block';
			this.$logo.src = this.logo;
		}else {
			this.$logo.style.display = 'none';
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

	/////////////////////
	// SEND RESET EMAIL
	/////////////////////
	_hideStepOne(hide){
		if(hide){
			this.$emailContainer.hidden = true;
			this.$emailButtonText.hidden = true;
			this.$email.removeAttribute('required');
		} else {
			this.$instructions.innerHTML = 'To reset your password, enter the email address you use to signin into your account.';
			this.$instructions.style.textAlign = 'left';
			this.$email.setAttribute('required', 'true');
			this.$emailContainer.hidden = false;
			this.$emailButtonText.hidden = false;
		}
	}

	/////////////////////
	// EMAIL SENT SCREEN
	/////////////////////
	_hideStepTwo(hide){
		if(hide){
			this.$sentButtonText.hidden = true;
			this.$submitButton.disabled = false;
		} else {
			this.$instructions.innerHTML = `Check your ${this.email || ''} inbox for instructions from us on how to reset your password`;
			this.$instructions.style.textAlign = 'left';
			this.$sentButtonText.hidden = false;
			this.$submitButton.disabled = true;
		}
	}

	/////////////////////
	// RESET PASSWORD (INPUT)
	/////////////////////
	_hideStepThree(hide){
		if(hide){
			this.$passwordContainer.hidden = true;
			this.$SignupButtonText.hidden = true;
			this.$password.removeAttribute('required');
			this.$passwordVerify.removeAttribute('required');
		} else {
			this.$instructions.innerHTML = 'Enter your new password';
			this.$instructions.style.textAlign = 'center';
			this.$passwordContainer.hidden = false;
			this.$SignupButtonText.hidden = false;
			this.$password.setAttribute('required', 'true');
			this.$passwordVerify.setAttribute('required', 'true');
		}
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

	_updatePasswordView(){
		let emailContainsNoPasswordClass = this.$email.classList.contains('no-password');

		if(this.noPassword){
			this.$password.required = false;
			this.$email.classList.add('no-password');
			this.$password.classList.add('no-password');
			this.$inputContainer.classList.add('no-password');
		}else {
			this.$password.required = true;
			this.$email.classList.remove('no-password');
			this.$password.classList.remove('no-password');
			this.$inputContainer.classList.remove('no-password');
		}
	}

	_updateButtonTextView(){
		if(this.buttonText && this.buttonText !== ''){
			this.$buttonText.innerHTML = this.buttonText;
		}
	}

	disconnectedCallback() {
		this._removeEvents()
		this.state.connected = false;
	}

	_removeEvents(){
	}

}

window.customElements.define('ui-signup', UISignupViewController);
