
const view = document.createElement("template");
view.innerHTML = `
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

	<style>
		:host([hidden]) {
			display:none!important;
		}
		:host {
			box-sizing: content-box;
			--ui-signup-font-family: 'Roboto', sans-serif;
			--ui-signup-background-color: transparent;
			--ui-signup-button-background-color: #409ad7;
			--ui-signup-button-border-color: #409ad7;

			--ui-signup-container-border-color: gray;
			--ui-signup-input-background-color: #fff;
			--ui-signup-input-border-color: darkGray;
			--ui-signup-button-text-color: #fff;
			--ui-signup-text-error-color: #CD5C5C;
		}
		.container{
			background-color: var(--ui-signup-background-color);
			margin-top:1px;
			margin-left:1px;
			width:calc(100% - 1px);
			height:calc(100% - 1px);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			min-width:300px;
			max-width:400px;
			min-height:365px;
			margin-left:auto;
			margin-right:auto;
		}
		.image-container {
			width:100%;
			box-sizing: border-box;
			padding:1em;
		}
		.form-container {
			width:90%;
		}
		.signup-logo {
			display:block;
			margin:auto;
			height:6em;
			padding:0px;
			padding-bottom:1em;
		}
		.input-container {
			position:relative;
			height:156px;
		}
		.input-container.no-password {
			height:104px;
		}

		.signup-given-name {
			box-sizing: content-box;
			position:absolute;
			left:0px;
			z-index:1;
			text-align:center;
			font-size:1em;
			padding:1em;
			background-color: var(--ui-signup-input-background-color);
			border:1px solid #a9a9a9;
			border-radius:5px 0px 0px 0px;
			border-right: 0px solid transparent;
			width:calc(50% - 30px - 2px);
		}
		.signup-given-name:focus{
			z-index:10;
		}
		.signup-family-name {
			box-sizing: content-box;
			position:absolute;
			z-index:1;
			text-align:center;
			font-size:1em;
			padding:1em;
			background-color: var(--ui-signup-input-background-color);
			border:1px solid #a9a9a9;
			border-radius:0px 5px 0px 0px;
			margin-left:50%;
			width:calc(50% - 30px - 4px);
		}
		.signup-family-name:focus{
			z-index:10;
		}
		.signup-email {
			box-sizing: content-box;
			margin-top:51px;
			position:absolute;
			z-index:1;
			display:block;
			font-size:1em;
			padding:1em;
			padding-left:44px;
			background-color: var(--ui-signup-input-background-color);
			border:1px solid #a9a9a9;
			width:calc(100% - 60px - 2px);
		}
		.signup-email.no-password {
			border-radius:0px 0px 5px 5px;
		}
		.signup-email:focus{
			z-index:10;
		}
		.signup-password {
			box-sizing: content-box;
			position:absolute;
			margin-top:102px;
			z-index:1;
			display:block;
			font-size:1em;
			padding:1em;
			background-color: var(--ui-signup-input-background-color);
			border:1px solid #a9a9a9;
			border-radius:0px 0px 5px 5px;
			width:calc(100% - 60px - 2px);
			padding-left:44px;
		}
		.signup-password.no-password {
			display:none;
		}
		.signup-password:focus{
			z-index:10;
		}
		.signup-button{
			width:100%;
			display:block;
			margin-top:1em;
			margin-left:auto;
			margin-right:auto;
			padding-bottom:0px;
			background-color: var(--ui-signup-button-background-color);
			text-transform: uppercase;
			border:1px var(--ui-signup-button-border-color) solid;
			color: var(--ui-signup-button-text-color);
			line-height:2.5em;
			border-radius:6px;
			font-size:1.1em;
			cursor:pointer;
		}
		.error-container {
			width:100%;
			text-align:center;
			height:0.8em;
			margin-top:0.8em;
		}
		#error {
			font-size:0.8em;
			color: var(--ui-signup-text-error-color);
			font-weight:800;
			visibility: hidden;
			line-height:0.8em;
			margin:0px;
			padding:0px;
		}
		.attention-animation {
			visibility: visible;
			animation: attention 300ms linear both;
			animation-iteration-count: 2;
		}
		@keyframes attention {
			0.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1); }
			11.11% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.725, 0, 1, 1); }
			22.22% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10.113, 0, 1, 1); }
			33.33% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 12, 0, 2, 1); }
			44.44% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4.08, 0, 2, 1); }
			55.56% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.84, 0, 2, 1); }
			66.67% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -12, 0, 3, 1); }
			77.78% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -10.275, 0, 3, 1); }
			88.89% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -1.887, 0, 3, 1); }
			100.00% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 1); }
		}
	</style>


	<div class="container">
		<div class="image-container">
			<img id="logo" class="signup-logo" src="" alt="logo" hidden/>
		</div>
		<div class="form-container">
			<form id="form" method="POST" action="">
				<input id="csrf" type="hidden" name="_csrf" class="form-control" value="">
				<div id="inputContainer" class="input-container">
					<input id="givenName" type="text" name="givenName" class="signup-given-name" placeholder="First Name" required>
					<input id="familyName" type="text" name="familyName" class="signup-family-name" placeholder="Last Name" required>
					<input id="email" type="email" name="email" class="signup-email" placeholder="email@email.com" required>
					<input id="password" type="password" name="password" class="signup-password" placeholder="••••••••••••••••••" minlength="8" required>
				</div>
				<slot name="content"></slot>
				<button id="submitButton" type="submit" class="signup-button">
					<span id="buttonText">Signup</span>
				</button>
				<div class="error-container">
					<p id="error"></p>
				</div>
			</form>
		</div>
	</div>
`;

export default view;
