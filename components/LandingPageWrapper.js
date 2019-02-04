export default (props) =>(
	<div className={`main-content`}>
		Page wrapper
		{props.children}
		<style jsx>{`
			@media all and (min-width: 480px) {
			  .Login {
			    padding: 60px 0;
			  }

			  .Login form {
			    margin: 0 auto;
			    max-width: 320px;
			  }
			}
		`}</style>
	</div>

)