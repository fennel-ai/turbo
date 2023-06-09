import { motion } from 'framer-motion';

const VARIANTS = {
	"0": {
		opacity: 0.4,
	},
	"1": {
		opacity: 0.4,
	},
	"2": {
		opacity: 1,
	},
	"3": {
		opacity: 1,
	}
};

const Features = () => {
	return (
		<motion.g variants={VARIANTS}>
			{/** Feature 1 */}
			<g filter="url(#filter3_b_522_11836)">
				<rect x="497" y="110" width="96" height="40" rx="12" fill="#E6FFF5" />
				<path d="M514.092 125.2H515.408V135H514.092V125.2ZM514.372 129.596H519.09V130.828H514.372V129.596ZM514.372 125.2H520.042V126.432H514.372V125.2ZM525.224 132.914L526.386 133.082C526.265 133.502 526.078 133.871 525.826 134.188C525.574 134.496 525.252 134.734 524.86 134.902C524.477 135.07 524.025 135.149 523.502 135.14C522.933 135.14 522.424 135.005 521.976 134.734C521.528 134.463 521.178 134.057 520.926 133.516C520.683 132.975 520.562 132.312 520.562 131.528C520.562 130.716 520.683 130.039 520.926 129.498C521.178 128.947 521.528 128.537 521.976 128.266C522.424 127.995 522.933 127.86 523.502 127.86C523.885 127.86 524.253 127.925 524.608 128.056C524.963 128.177 525.285 128.383 525.574 128.672C525.863 128.961 526.087 129.358 526.246 129.862C526.414 130.357 526.489 130.977 526.47 131.724H525.294C525.313 131.005 525.243 130.445 525.084 130.044C524.925 129.643 524.706 129.358 524.426 129.19C524.155 129.022 523.847 128.938 523.502 128.938C523.157 128.938 522.867 129.017 522.634 129.176C522.41 129.325 522.228 129.526 522.088 129.778C521.957 130.03 521.859 130.31 521.794 130.618C521.738 130.926 521.71 131.229 521.71 131.528C521.71 131.808 521.738 132.097 521.794 132.396C521.859 132.695 521.957 132.97 522.088 133.222C522.219 133.465 522.396 133.665 522.62 133.824C522.853 133.973 523.147 134.048 523.502 134.048C523.866 134.048 524.16 133.997 524.384 133.894C524.608 133.791 524.785 133.651 524.916 133.474C525.047 133.297 525.149 133.11 525.224 132.914ZM520.856 130.744H526.064V131.724H520.856V130.744ZM530.118 135.126C529.661 135.126 529.25 135.051 528.886 134.902C528.532 134.743 528.252 134.505 528.046 134.188C527.85 133.861 527.752 133.46 527.752 132.984C527.752 132.256 528.056 131.696 528.662 131.304C529.269 130.912 530.1 130.716 531.154 130.716H532.54H533.772V135.014H532.624L532.54 133.978C532.288 134.333 531.966 134.613 531.574 134.818C531.182 135.023 530.697 135.126 530.118 135.126ZM530.286 134.048C530.632 134.048 530.977 133.983 531.322 133.852C531.668 133.721 531.957 133.502 532.19 133.194C532.424 132.886 532.54 132.466 532.54 131.934V131.696H531.196C530.44 131.696 529.88 131.808 529.516 132.032C529.152 132.256 528.97 132.569 528.97 132.97C528.97 133.334 529.087 133.605 529.32 133.782C529.563 133.959 529.885 134.048 530.286 134.048ZM532.54 130.716C532.54 130.091 532.405 129.638 532.134 129.358C531.873 129.078 531.458 128.938 530.888 128.938C530.524 128.938 530.23 128.994 530.006 129.106C529.782 129.209 529.61 129.353 529.488 129.54C529.376 129.717 529.297 129.918 529.25 130.142L528.032 130.1C528.088 129.699 528.224 129.33 528.438 128.994C528.653 128.649 528.956 128.373 529.348 128.168C529.74 127.953 530.226 127.846 530.804 127.846C531.448 127.846 531.99 127.963 532.428 128.196C532.867 128.429 533.198 128.761 533.422 129.19C533.656 129.61 533.772 130.119 533.772 130.716V130.926H532.54V130.716ZM534.923 128H539.347V129.134H534.923V128ZM536.225 132.2H537.457V132.704C537.457 132.919 537.467 133.115 537.485 133.292C537.513 133.46 537.588 133.595 537.709 133.698C537.84 133.801 538.055 133.852 538.353 133.852H539.347V135H537.835C537.415 135 537.089 134.902 536.855 134.706C536.622 134.51 536.459 134.235 536.365 133.88C536.272 133.525 536.225 133.105 536.225 132.62V132.2ZM537.457 132.2H536.225V126.026H537.457V132.2ZM541.841 128V131.514H540.609V128H541.841ZM541.841 131.486C541.841 131.803 541.869 132.116 541.925 132.424C541.99 132.723 542.088 132.993 542.219 133.236C542.349 133.469 542.522 133.656 542.737 133.796C542.951 133.927 543.213 133.992 543.521 133.992C544.23 133.992 544.72 133.745 544.991 133.25C545.271 132.746 545.411 132.009 545.411 131.038C545.411 131.038 545.462 131.038 545.565 131.038C545.677 131.038 545.784 131.038 545.887 131.038C545.999 131.038 546.055 131.038 546.055 131.038C546.055 131.953 545.961 132.713 545.775 133.32C545.588 133.927 545.289 134.384 544.879 134.692C544.468 134.991 543.941 135.14 543.297 135.14C542.802 135.14 542.382 135.047 542.037 134.86C541.701 134.673 541.425 134.417 541.211 134.09C541.005 133.754 540.851 133.367 540.749 132.928C540.655 132.48 540.609 131.999 540.609 131.486H541.841ZM546.643 128V135H545.411V128H546.643ZM552.293 129.092C551.817 129.092 551.401 129.199 551.047 129.414C550.701 129.619 550.426 129.932 550.221 130.352C550.015 130.772 549.903 131.309 549.885 131.962C549.885 131.962 549.852 131.962 549.787 131.962C549.731 131.962 549.67 131.962 549.605 131.962C549.549 131.962 549.521 131.962 549.521 131.962C549.539 131.327 549.6 130.758 549.703 130.254C549.815 129.75 549.978 129.321 550.193 128.966C550.417 128.602 550.697 128.327 551.033 128.14C551.378 127.953 551.798 127.86 552.293 127.86C552.293 127.86 552.293 127.925 552.293 128.056C552.293 128.177 552.293 128.317 552.293 128.476C552.293 128.635 552.293 128.779 552.293 128.91C552.293 129.031 552.293 129.092 552.293 129.092ZM548.653 135V128H549.885V135H548.653ZM557.845 132.914L559.007 133.082C558.886 133.502 558.699 133.871 558.447 134.188C558.195 134.496 557.873 134.734 557.481 134.902C557.098 135.07 556.646 135.149 556.123 135.14C555.554 135.14 555.045 135.005 554.597 134.734C554.149 134.463 553.799 134.057 553.547 133.516C553.304 132.975 553.183 132.312 553.183 131.528C553.183 130.716 553.304 130.039 553.547 129.498C553.799 128.947 554.149 128.537 554.597 128.266C555.045 127.995 555.554 127.86 556.123 127.86C556.506 127.86 556.874 127.925 557.229 128.056C557.584 128.177 557.906 128.383 558.195 128.672C558.484 128.961 558.708 129.358 558.867 129.862C559.035 130.357 559.11 130.977 559.091 131.724H557.915C557.934 131.005 557.864 130.445 557.705 130.044C557.546 129.643 557.327 129.358 557.047 129.19C556.776 129.022 556.468 128.938 556.123 128.938C555.778 128.938 555.488 129.017 555.255 129.176C555.031 129.325 554.849 129.526 554.709 129.778C554.578 130.03 554.48 130.31 554.415 130.618C554.359 130.926 554.331 131.229 554.331 131.528C554.331 131.808 554.359 132.097 554.415 132.396C554.48 132.695 554.578 132.97 554.709 133.222C554.84 133.465 555.017 133.665 555.241 133.824C555.474 133.973 555.768 134.048 556.123 134.048C556.487 134.048 556.781 133.997 557.005 133.894C557.229 133.791 557.406 133.651 557.537 133.474C557.668 133.297 557.77 133.11 557.845 132.914ZM553.477 130.744H558.685V131.724H553.477V130.744ZM564.377 125.2H565.693V135H564.377V125.2ZM564.657 129.596H569.375V130.828H564.657V129.596ZM564.657 125.2H570.327V126.432H564.657V125.2ZM573.854 126.67L571.572 128.112V126.684L573.938 125.2H575.17V135H573.854V126.67Z" fill="#055736" />
				<rect x="497.5" y="110.5" width="95" height="39" rx="11.5" stroke="#B1FBDE" />
			</g>
			{/** END Feature 1 */}

			{/** Feature 2 */}
			<g filter="url(#filter4_b_522_11836)">
				<rect x="495" y="303" width="98" height="40" rx="12" fill="#E6FFF5" />
				<path d="M512.092 318.2H513.408V328H512.092V318.2ZM512.372 322.596H517.09V323.828H512.372V322.596ZM512.372 318.2H518.042V319.432H512.372V318.2ZM523.224 325.914L524.386 326.082C524.265 326.502 524.078 326.871 523.826 327.188C523.574 327.496 523.252 327.734 522.86 327.902C522.477 328.07 522.025 328.149 521.502 328.14C520.933 328.14 520.424 328.005 519.976 327.734C519.528 327.463 519.178 327.057 518.926 326.516C518.683 325.975 518.562 325.312 518.562 324.528C518.562 323.716 518.683 323.039 518.926 322.498C519.178 321.947 519.528 321.537 519.976 321.266C520.424 320.995 520.933 320.86 521.502 320.86C521.885 320.86 522.253 320.925 522.608 321.056C522.963 321.177 523.285 321.383 523.574 321.672C523.863 321.961 524.087 322.358 524.246 322.862C524.414 323.357 524.489 323.977 524.47 324.724H523.294C523.313 324.005 523.243 323.445 523.084 323.044C522.925 322.643 522.706 322.358 522.426 322.19C522.155 322.022 521.847 321.938 521.502 321.938C521.157 321.938 520.867 322.017 520.634 322.176C520.41 322.325 520.228 322.526 520.088 322.778C519.957 323.03 519.859 323.31 519.794 323.618C519.738 323.926 519.71 324.229 519.71 324.528C519.71 324.808 519.738 325.097 519.794 325.396C519.859 325.695 519.957 325.97 520.088 326.222C520.219 326.465 520.396 326.665 520.62 326.824C520.853 326.973 521.147 327.048 521.502 327.048C521.866 327.048 522.16 326.997 522.384 326.894C522.608 326.791 522.785 326.651 522.916 326.474C523.047 326.297 523.149 326.11 523.224 325.914ZM518.856 323.744H524.064V324.724H518.856V323.744ZM528.118 328.126C527.661 328.126 527.25 328.051 526.886 327.902C526.532 327.743 526.252 327.505 526.046 327.188C525.85 326.861 525.752 326.46 525.752 325.984C525.752 325.256 526.056 324.696 526.662 324.304C527.269 323.912 528.1 323.716 529.154 323.716H530.54H531.772V328.014H530.624L530.54 326.978C530.288 327.333 529.966 327.613 529.574 327.818C529.182 328.023 528.697 328.126 528.118 328.126ZM528.286 327.048C528.632 327.048 528.977 326.983 529.322 326.852C529.668 326.721 529.957 326.502 530.19 326.194C530.424 325.886 530.54 325.466 530.54 324.934V324.696H529.196C528.44 324.696 527.88 324.808 527.516 325.032C527.152 325.256 526.97 325.569 526.97 325.97C526.97 326.334 527.087 326.605 527.32 326.782C527.563 326.959 527.885 327.048 528.286 327.048ZM530.54 323.716C530.54 323.091 530.405 322.638 530.134 322.358C529.873 322.078 529.458 321.938 528.888 321.938C528.524 321.938 528.23 321.994 528.006 322.106C527.782 322.209 527.61 322.353 527.488 322.54C527.376 322.717 527.297 322.918 527.25 323.142L526.032 323.1C526.088 322.699 526.224 322.33 526.438 321.994C526.653 321.649 526.956 321.373 527.348 321.168C527.74 320.953 528.226 320.846 528.804 320.846C529.448 320.846 529.99 320.963 530.428 321.196C530.867 321.429 531.198 321.761 531.422 322.19C531.656 322.61 531.772 323.119 531.772 323.716V323.926H530.54V323.716ZM532.923 321H537.347V322.134H532.923V321ZM534.225 325.2H535.457V325.704C535.457 325.919 535.467 326.115 535.485 326.292C535.513 326.46 535.588 326.595 535.709 326.698C535.84 326.801 536.055 326.852 536.353 326.852H537.347V328H535.835C535.415 328 535.089 327.902 534.855 327.706C534.622 327.51 534.459 327.235 534.365 326.88C534.272 326.525 534.225 326.105 534.225 325.62V325.2ZM535.457 325.2H534.225V319.026H535.457V325.2ZM539.841 321V324.514H538.609V321H539.841ZM539.841 324.486C539.841 324.803 539.869 325.116 539.925 325.424C539.99 325.723 540.088 325.993 540.219 326.236C540.349 326.469 540.522 326.656 540.737 326.796C540.951 326.927 541.213 326.992 541.521 326.992C542.23 326.992 542.72 326.745 542.991 326.25C543.271 325.746 543.411 325.009 543.411 324.038C543.411 324.038 543.462 324.038 543.565 324.038C543.677 324.038 543.784 324.038 543.887 324.038C543.999 324.038 544.055 324.038 544.055 324.038C544.055 324.953 543.961 325.713 543.775 326.32C543.588 326.927 543.289 327.384 542.879 327.692C542.468 327.991 541.941 328.14 541.297 328.14C540.802 328.14 540.382 328.047 540.037 327.86C539.701 327.673 539.425 327.417 539.211 327.09C539.005 326.754 538.851 326.367 538.749 325.928C538.655 325.48 538.609 324.999 538.609 324.486H539.841ZM544.643 321V328H543.411V321H544.643ZM550.293 322.092C549.817 322.092 549.401 322.199 549.047 322.414C548.701 322.619 548.426 322.932 548.221 323.352C548.015 323.772 547.903 324.309 547.885 324.962C547.885 324.962 547.852 324.962 547.787 324.962C547.731 324.962 547.67 324.962 547.605 324.962C547.549 324.962 547.521 324.962 547.521 324.962C547.539 324.327 547.6 323.758 547.703 323.254C547.815 322.75 547.978 322.321 548.193 321.966C548.417 321.602 548.697 321.327 549.033 321.14C549.378 320.953 549.798 320.86 550.293 320.86C550.293 320.86 550.293 320.925 550.293 321.056C550.293 321.177 550.293 321.317 550.293 321.476C550.293 321.635 550.293 321.779 550.293 321.91C550.293 322.031 550.293 322.092 550.293 322.092ZM546.653 328V321H547.885V328H546.653ZM555.845 325.914L557.007 326.082C556.886 326.502 556.699 326.871 556.447 327.188C556.195 327.496 555.873 327.734 555.481 327.902C555.098 328.07 554.646 328.149 554.123 328.14C553.554 328.14 553.045 328.005 552.597 327.734C552.149 327.463 551.799 327.057 551.547 326.516C551.304 325.975 551.183 325.312 551.183 324.528C551.183 323.716 551.304 323.039 551.547 322.498C551.799 321.947 552.149 321.537 552.597 321.266C553.045 320.995 553.554 320.86 554.123 320.86C554.506 320.86 554.874 320.925 555.229 321.056C555.584 321.177 555.906 321.383 556.195 321.672C556.484 321.961 556.708 322.358 556.867 322.862C557.035 323.357 557.11 323.977 557.091 324.724H555.915C555.934 324.005 555.864 323.445 555.705 323.044C555.546 322.643 555.327 322.358 555.047 322.19C554.776 322.022 554.468 321.938 554.123 321.938C553.778 321.938 553.488 322.017 553.255 322.176C553.031 322.325 552.849 322.526 552.709 322.778C552.578 323.03 552.48 323.31 552.415 323.618C552.359 323.926 552.331 324.229 552.331 324.528C552.331 324.808 552.359 325.097 552.415 325.396C552.48 325.695 552.578 325.97 552.709 326.222C552.84 326.465 553.017 326.665 553.241 326.824C553.474 326.973 553.768 327.048 554.123 327.048C554.487 327.048 554.781 326.997 555.005 326.894C555.229 326.791 555.406 326.651 555.537 326.474C555.668 326.297 555.77 326.11 555.845 325.914ZM551.477 323.744H556.685V324.724H551.477V323.744ZM562.377 318.2H563.693V328H562.377V318.2ZM562.657 322.596H567.375V323.828H562.657V322.596ZM562.657 318.2H568.327V319.432H562.657V318.2ZM571.224 321.196L569.908 321.112C569.936 320.711 570.02 320.333 570.16 319.978C570.3 319.614 570.496 319.292 570.748 319.012C571.01 318.732 571.332 318.513 571.714 318.354C572.097 318.195 572.55 318.116 573.072 318.116C573.744 318.116 574.295 318.265 574.724 318.564C575.163 318.863 575.485 319.245 575.69 319.712C575.896 320.179 575.998 320.683 575.998 321.224C575.998 321.597 575.914 321.961 575.746 322.316C575.588 322.671 575.382 323.007 575.13 323.324C574.878 323.641 574.612 323.935 574.332 324.206C574.062 324.467 573.824 324.701 573.618 324.906L571.7 326.754H576.124V328H569.782V326.796L572.75 323.968C572.909 323.809 573.096 323.632 573.31 323.436C573.525 323.231 573.735 323.011 573.94 322.778C574.155 322.535 574.332 322.283 574.472 322.022C574.612 321.751 574.682 321.471 574.682 321.182C574.682 320.837 574.622 320.529 574.5 320.258C574.388 319.978 574.206 319.759 573.954 319.6C573.712 319.432 573.404 319.348 573.03 319.348C572.498 319.348 572.074 319.507 571.756 319.824C571.439 320.141 571.262 320.599 571.224 321.196Z" fill="#055736" />
				<rect x="495.5" y="303.5" width="97" height="39" rx="11.5" stroke="#B1FBDE" />
			</g>
			{/** END Feature 2 */}
		</motion.g>
	);
}

export default Features;