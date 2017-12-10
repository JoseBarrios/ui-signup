'use strict'

const uiSignupDoc = document._currentScript || document.currentScript;
const uiSignupView = uiSignupDoc.ownerDocument.querySelector('#ui-signup-view');

class UISignupViewController extends HTMLElement {

  static get observedAttributes(){
    return ['action', 'logo', 'given-name', 'family-name', 'email', 'csrf', 'error'];
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
    this.$givenName = this.shadowRoot.querySelector('#givenName');
    this.$familyName = this.shadowRoot.querySelector('#familyName');
    this.$email = this.shadowRoot.querySelector('#email');
    this.$password = this.shadowRoot.querySelector('#password');
    this.$error = this.shadowRoot.querySelector('#error');

		//Reference events with bindings
		this.event.change = this._onChange.bind(this);
    this.$givenName.addEventListener('change', this.event.change);
    this.$familyName.addEventListener('change', this.event.change);
    this.$email.addEventListener('change', this.event.change);

		this.state.connected = true;
    this._updateView();
	}

	adoptedCallback(){
		console.log('adoptedCallback');
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		console.log(attrName, newVal)
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

			case 'given-name':
				if(newVal !== this.givenName){ this.givenName = newVal; }
				break;

			case 'family-name':
				if(newVal !== this.familyName){ this.familyName = newVal; }
				break;

			case 'email':
				if(newVal !== this.email){ this.email = newVal; }
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

	get givenName(){ return this.model.givenName; }
	set givenName(value){
		//Check if attribute matches property value, Sync the property with the
		//attribute if they do not, skip this step if already sync
		if(this.getAttribute('given-name') !== value){
			//By setting the attribute, the attributeChangedCallback() function is
			//called, which inturn calls this setter again.
			this.setAttribute('given-name', value);
			//attributeChangeCallback() implicitly called
			return;
		}

		this.model.givenName = value.charAt(0).toUpperCase() + value.slice(1);
		this._updateView(this.$givenName);
	}

	get familyName(){ return this.model.familyName; }
	set familyName(value){
		//Check if attribute matches property value, Sync the property with the
		//attribute if they do not, skip this step if already sync
		if(this.getAttribute('family-name') !== value){
			//By setting the attribute, the attributeChangedCallback() function is
			//called, which inturn calls this setter again.
			this.setAttribute('family-name', value);
			//attributeChangeCallback() implicitly called
			return;
		}

		this.model.familyName = value.charAt(0).toUpperCase() + value.slice(1);
		this._updateView(this.$familyName);
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
			case this.$givenName:
				this.setAttribute('given-name', e.target.value);
				break;
			case this.$familyName:
				this.setAttribute('family-name', e.target.value);
				break;
			case this.$email:
				this.setAttribute('email', e.target.value);
				break;
		}
	}

  _updateView(view) {
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

			case this.$givenName:
				this._updateGivenNameView();
				break;

			case this.$familyName:
				this._updateFamilyNameView();
				break;

			case this.$email:
				this._updateEmailView();
				break;

			case this.$error:
				this._updateErrorView();
				break;


			default:
				this._updateForm();
				this._updateCSRF();
				this._updateGivenNameView();
				this._updateFamilyNameView();
				this._updateEmailView();
				this._updateLogoView();
				this._updateErrorView();

				if(this.$givenName.value){ this.$familyName.focus() }
				if(this.$familyName.value){ this.$email.focus() }
				if(this.$email.value){ this.$password.focus() }
		}
  }

	_updateForm(){
		if(this.model.action && this.model.action !== ''){
			this.$form.action = this.model.action;
		}
	}

	_updateCSRF(){
		if(this.model.csrf && this.model.csrf !== ''){
			this.$csrf.value = this.model.csrf;
		}
	}

	_updateLogoView(){
		if(this.model.logo && this.model.logo !== ''){
			this.$logo.src = this.model.logo;
		}
	}

	_updateGivenNameView(){
		if(this.model.givenName && this.model.givenName !== ''){
			this.$givenName.value = this.model.givenName;
		}
	}

	_updateFamilyNameView(){
		if(this.model.familyName && this.model.familyName !== ''){
		this.$familyName.value = this.model.familyName;
		}
	}

	_updateEmailView(){
		if(this.model.email && this.model.email !== ''){
			this.$email.value = this.model.email;
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


	disconnectedCallback() {
		this._removeEvents()
		this.state.connected = false;
	}

	_removeEvents(){
    this.$givenName.removeEventListener('focus', this.event.focus);
    this.$givenName.removeEventListener('blur', this.event.blur);
	}

}

window.customElements.define('ui-signup', UISignupViewController);
