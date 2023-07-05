import { useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

const VARIANTS = {
	"0": {
		opacity: 0.24,
	},
	"1": {
		opacity: 1,
	},
	"2": {
		opacity: 0.24,
	},
	"3": {
		opacity: 1,
	}
};

const DerivedDatasets = () => {
	const theme = useTheme();

	return (
		<motion.g variants={VARIANTS}>
			{/** Dataset D */}
			<path opacity="0.12" d="M352 120C374.368 120 392.5 115.971 392.5 111V153C392.5 157.98 374.5 162 352 162C329.5 162 311.5 157.98 311.5 153V111C311.5 115.971 329.632 120 352 120Z" fill={theme.primary.accent} />
			<mask id="path-367-outside-1_522_11836" maskUnits="userSpaceOnUse" x="309.5" y="100" width="85" height="64" fill="black">
				<rect fill="white" x="309.5" y="100" width="85" height="64" />
				<path d="M352 120C374.368 120 392.5 115.971 392.5 111C392.5 106.029 374.368 102 352 102C329.632 102 311.5 106.029 311.5 111C311.5 115.971 329.632 120 352 120Z" />
				<path d="M392.5 132C392.5 136.98 374.5 141 352 141C329.5 141 311.5 136.98 311.5 132" />
				<path d="M311.5 111V153C311.5 157.98 329.5 162 352 162C374.5 162 392.5 157.98 392.5 153V111" />
			</mask>
			<path d="M394.5 132C394.5 130.895 393.605 130 392.5 130C391.395 130 390.5 130.895 390.5 132H394.5ZM313.5 132C313.5 130.895 312.605 130 311.5 130C310.395 130 309.5 130.895 309.5 132H313.5ZM390.5 111C390.5 111.002 390.5 111.007 390.497 111.018C390.495 111.03 390.488 111.053 390.472 111.089C390.438 111.163 390.363 111.288 390.206 111.459C389.879 111.814 389.301 112.253 388.387 112.733C386.564 113.691 383.795 114.614 380.204 115.412C373.055 117 363.083 118 352 118V122C363.285 122 373.562 120.985 381.072 119.316C384.81 118.486 387.972 117.469 390.248 116.274C391.383 115.677 392.396 114.985 393.148 114.169C393.91 113.341 394.5 112.273 394.5 111H390.5ZM352 118C340.917 118 330.945 117 323.796 115.412C320.206 114.614 317.436 113.691 315.613 112.733C314.699 112.253 314.121 111.814 313.794 111.459C313.637 111.288 313.562 111.163 313.528 111.089C313.512 111.053 313.505 111.03 313.503 111.018C313.5 111.007 313.5 111.002 313.5 111H309.5C309.5 112.273 310.09 113.341 310.852 114.169C311.604 114.985 312.617 115.677 313.752 116.274C316.028 117.469 319.19 118.486 322.928 119.316C330.438 120.985 340.715 122 352 122V118ZM313.5 111C313.5 110.998 313.5 110.993 313.503 110.982C313.505 110.97 313.512 110.947 313.528 110.911C313.562 110.837 313.637 110.712 313.794 110.541C314.121 110.186 314.699 109.747 315.613 109.267C317.436 108.309 320.206 107.386 323.796 106.588C330.945 105 340.917 104 352 104V100C340.715 100 330.438 101.015 322.928 102.684C319.19 103.514 316.028 104.531 313.752 105.726C312.617 106.323 311.604 107.015 310.852 107.831C310.09 108.659 309.5 109.727 309.5 111H313.5ZM352 104C363.083 104 373.055 105 380.204 106.588C383.795 107.386 386.564 108.309 388.387 109.267C389.301 109.747 389.879 110.186 390.206 110.541C390.363 110.712 390.438 110.837 390.472 110.911C390.488 110.947 390.495 110.97 390.497 110.982C390.5 110.993 390.5 110.998 390.5 111H394.5C394.5 109.727 393.91 108.659 393.148 107.831C392.396 107.015 391.383 106.323 390.248 105.726C387.972 104.531 384.81 103.514 381.072 102.684C373.562 101.015 363.285 100 352 100V104ZM390.5 132C390.5 132.001 390.502 132.028 390.471 132.096C390.437 132.171 390.362 132.296 390.206 132.467C389.883 132.821 389.309 133.259 388.402 133.739C386.59 134.696 383.835 135.618 380.253 136.415C373.122 138.002 363.15 139 352 139V143C363.35 143 373.628 141.988 381.122 140.32C384.853 139.489 388.003 138.473 390.27 137.276C391.402 136.678 392.41 135.985 393.159 135.166C393.918 134.336 394.5 133.269 394.5 132H390.5ZM352 139C340.85 139 330.878 138.002 323.747 136.415C320.165 135.618 317.41 134.696 315.598 133.739C314.691 133.259 314.117 132.821 313.794 132.467C313.638 132.296 313.563 132.171 313.529 132.096C313.498 132.028 313.5 132.001 313.5 132H309.5C309.5 133.269 310.082 134.336 310.841 135.166C311.59 135.985 312.598 136.678 313.73 137.276C315.997 138.473 319.147 139.489 322.878 140.32C330.372 141.988 340.65 143 352 143V139ZM309.5 111V153H313.5V111H309.5ZM309.5 153C309.5 154.269 310.082 155.336 310.841 156.166C311.59 156.985 312.598 157.678 313.73 158.276C315.997 159.473 319.147 160.489 322.878 161.32C330.372 162.988 340.65 164 352 164V160C340.85 160 330.878 159.002 323.747 157.415C320.165 156.618 317.41 155.696 315.598 154.739C314.691 154.259 314.117 153.821 313.794 153.467C313.638 153.296 313.563 153.171 313.529 153.096C313.498 153.028 313.5 153.001 313.5 153H309.5ZM352 164C363.35 164 373.628 162.988 381.122 161.32C384.853 160.489 388.003 159.473 390.27 158.276C391.402 157.678 392.41 156.985 393.159 156.166C393.918 155.336 394.5 154.269 394.5 153H390.5C390.5 153.001 390.502 153.028 390.471 153.096C390.437 153.171 390.362 153.296 390.206 153.467C389.883 153.821 389.309 154.259 388.402 154.739C386.59 155.696 383.835 156.618 380.253 157.415C373.122 159.002 363.15 160 352 160V164ZM394.5 153V111H390.5V153H394.5Z" fill={theme.primary.accent} mask="url(#path-367-outside-1_522_11836)" />
			<path d="M327.936 140V131.6H330.564C331.092 131.6 331.572 131.708 332.004 131.924C332.444 132.132 332.824 132.428 333.144 132.812C333.472 133.196 333.724 133.644 333.9 134.156C334.084 134.66 334.176 135.208 334.176 135.8C334.176 136.424 334.092 136.992 333.924 137.504C333.756 138.016 333.512 138.46 333.192 138.836C332.88 139.204 332.504 139.492 332.064 139.7C331.624 139.9 331.124 140 330.564 140H327.936ZM329.064 138.932H330.42C330.94 138.932 331.396 138.816 331.788 138.584C332.18 138.344 332.488 137.992 332.712 137.528C332.936 137.064 333.048 136.488 333.048 135.8C333.048 135.32 332.984 134.888 332.856 134.504C332.736 134.112 332.56 133.78 332.328 133.508C332.096 133.228 331.816 133.016 331.488 132.872C331.168 132.728 330.812 132.656 330.42 132.656H329.064V138.932ZM337.325 140.108C336.933 140.108 336.581 140.044 336.269 139.916C335.965 139.78 335.725 139.576 335.549 139.304C335.381 139.024 335.297 138.68 335.297 138.272C335.297 137.648 335.557 137.168 336.077 136.832C336.597 136.496 337.309 136.328 338.213 136.328H339.401H340.457V140.012H339.473L339.401 139.124C339.185 139.428 338.909 139.668 338.573 139.844C338.237 140.02 337.821 140.108 337.325 140.108ZM337.469 139.184C337.765 139.184 338.061 139.128 338.357 139.016C338.653 138.904 338.901 138.716 339.101 138.452C339.301 138.188 339.401 137.828 339.401 137.372V137.168H338.249C337.601 137.168 337.121 137.264 336.809 137.456C336.497 137.648 336.341 137.916 336.341 138.26C336.341 138.572 336.441 138.804 336.641 138.956C336.849 139.108 337.125 139.184 337.469 139.184ZM339.401 136.328C339.401 135.792 339.285 135.404 339.053 135.164C338.829 134.924 338.473 134.804 337.985 134.804C337.673 134.804 337.421 134.852 337.229 134.948C337.037 135.036 336.889 135.16 336.785 135.32C336.689 135.472 336.621 135.644 336.581 135.836L335.537 135.8C335.585 135.456 335.701 135.14 335.885 134.852C336.069 134.556 336.329 134.32 336.665 134.144C337.001 133.96 337.417 133.868 337.913 133.868C338.465 133.868 338.929 133.968 339.305 134.168C339.681 134.368 339.965 134.652 340.157 135.02C340.357 135.38 340.457 135.816 340.457 136.328V136.508H339.401V136.328ZM341.444 134H345.236V134.972H341.444V134ZM342.56 137.6H343.616V138.032C343.616 138.216 343.624 138.384 343.64 138.536C343.664 138.68 343.728 138.796 343.832 138.884C343.944 138.972 344.128 139.016 344.384 139.016H345.236V140H343.94C343.58 140 343.3 139.916 343.1 139.748C342.9 139.58 342.76 139.344 342.68 139.04C342.6 138.736 342.56 138.376 342.56 137.96V137.6ZM343.616 137.6H342.56V132.308H343.616V137.6ZM348.177 140.108C347.785 140.108 347.433 140.044 347.121 139.916C346.817 139.78 346.577 139.576 346.401 139.304C346.233 139.024 346.149 138.68 346.149 138.272C346.149 137.648 346.409 137.168 346.929 136.832C347.449 136.496 348.161 136.328 349.065 136.328H350.253H351.309V140.012H350.325L350.253 139.124C350.037 139.428 349.761 139.668 349.425 139.844C349.089 140.02 348.673 140.108 348.177 140.108ZM348.321 139.184C348.617 139.184 348.913 139.128 349.209 139.016C349.505 138.904 349.753 138.716 349.953 138.452C350.153 138.188 350.253 137.828 350.253 137.372V137.168H349.101C348.453 137.168 347.973 137.264 347.661 137.456C347.349 137.648 347.193 137.916 347.193 138.26C347.193 138.572 347.293 138.804 347.493 138.956C347.701 139.108 347.977 139.184 348.321 139.184ZM350.253 136.328C350.253 135.792 350.137 135.404 349.905 135.164C349.681 134.924 349.325 134.804 348.837 134.804C348.525 134.804 348.273 134.852 348.081 134.948C347.889 135.036 347.741 135.16 347.637 135.32C347.541 135.472 347.473 135.644 347.433 135.836L346.389 135.8C346.437 135.456 346.553 135.14 346.737 134.852C346.921 134.556 347.181 134.32 347.517 134.144C347.853 133.96 348.269 133.868 348.765 133.868C349.317 133.868 349.781 133.968 350.157 134.168C350.533 134.368 350.817 134.652 351.009 135.02C351.209 135.38 351.309 135.816 351.309 136.328V136.508H350.253V136.328ZM355.126 140.132C354.606 140.132 354.154 140.044 353.77 139.868C353.394 139.692 353.098 139.452 352.882 139.148C352.674 138.836 352.566 138.48 352.558 138.08H353.614C353.614 138.336 353.686 138.548 353.83 138.716C353.974 138.876 354.158 138.996 354.382 139.076C354.606 139.156 354.846 139.196 355.102 139.196C355.366 139.196 355.606 139.164 355.822 139.1C356.038 139.036 356.214 138.936 356.35 138.8C356.486 138.664 356.554 138.496 356.554 138.296C356.554 138.08 356.47 137.904 356.302 137.768C356.134 137.624 355.918 137.532 355.654 137.492C355.51 137.476 355.354 137.456 355.186 137.432C355.018 137.408 354.85 137.388 354.682 137.372C354.514 137.348 354.362 137.328 354.226 137.312C353.786 137.24 353.434 137.056 353.17 136.76C352.906 136.464 352.774 136.116 352.774 135.716C352.774 135.34 352.878 135.016 353.086 134.744C353.294 134.464 353.574 134.248 353.926 134.096C354.278 133.944 354.666 133.868 355.09 133.868C355.53 133.868 355.918 133.944 356.254 134.096C356.598 134.248 356.87 134.468 357.07 134.756C357.27 135.036 357.374 135.376 357.382 135.776H356.326C356.302 135.488 356.178 135.252 355.954 135.068C355.738 134.884 355.454 134.792 355.102 134.792C354.902 134.792 354.702 134.82 354.502 134.876C354.31 134.932 354.146 135.024 354.01 135.152C353.882 135.28 353.818 135.452 353.818 135.668C353.818 135.86 353.882 136.016 354.01 136.136C354.146 136.256 354.35 136.332 354.622 136.364C354.662 136.372 354.766 136.388 354.934 136.412C355.102 136.436 355.29 136.464 355.498 136.496C355.706 136.52 355.882 136.544 356.026 136.568C356.346 136.624 356.622 136.728 356.854 136.88C357.094 137.024 357.278 137.212 357.406 137.444C357.534 137.668 357.598 137.924 357.598 138.212C357.598 138.644 357.486 139.004 357.262 139.292C357.038 139.572 356.738 139.784 356.362 139.928C355.994 140.064 355.582 140.132 355.126 140.132ZM362.626 138.212L363.622 138.356C363.518 138.716 363.358 139.032 363.142 139.304C362.926 139.568 362.65 139.772 362.314 139.916C361.986 140.06 361.598 140.128 361.15 140.12C360.662 140.12 360.226 140.004 359.842 139.772C359.458 139.54 359.158 139.192 358.942 138.728C358.734 138.264 358.63 137.696 358.63 137.024C358.63 136.328 358.734 135.748 358.942 135.284C359.158 134.812 359.458 134.46 359.842 134.228C360.226 133.996 360.662 133.88 361.15 133.88C361.478 133.88 361.794 133.936 362.098 134.048C362.402 134.152 362.678 134.328 362.926 134.576C363.174 134.824 363.366 135.164 363.502 135.596C363.646 136.02 363.71 136.552 363.694 137.192H362.686C362.702 136.576 362.642 136.096 362.506 135.752C362.37 135.408 362.182 135.164 361.942 135.02C361.71 134.876 361.446 134.804 361.15 134.804C360.854 134.804 360.606 134.872 360.406 135.008C360.214 135.136 360.058 135.308 359.938 135.524C359.826 135.74 359.742 135.98 359.686 136.244C359.638 136.508 359.614 136.768 359.614 137.024C359.614 137.264 359.638 137.512 359.686 137.768C359.742 138.024 359.826 138.26 359.938 138.476C360.05 138.684 360.202 138.856 360.394 138.992C360.594 139.12 360.846 139.184 361.15 139.184C361.462 139.184 361.714 139.14 361.906 139.052C362.098 138.964 362.25 138.844 362.362 138.692C362.474 138.54 362.562 138.38 362.626 138.212ZM358.882 136.352H363.346V137.192H358.882V136.352ZM364.366 134H368.158V134.972H364.366V134ZM365.482 137.6H366.538V138.032C366.538 138.216 366.546 138.384 366.562 138.536C366.586 138.68 366.65 138.796 366.754 138.884C366.866 138.972 367.05 139.016 367.306 139.016H368.158V140H366.862C366.502 140 366.222 139.916 366.022 139.748C365.822 139.58 365.682 139.344 365.602 139.04C365.522 138.736 365.482 138.376 365.482 137.96V137.6ZM366.538 137.6H365.482V132.308H366.538V137.6ZM372.502 140V131.6H375.13C375.658 131.6 376.138 131.708 376.57 131.924C377.01 132.132 377.39 132.428 377.71 132.812C378.038 133.196 378.29 133.644 378.466 134.156C378.65 134.66 378.742 135.208 378.742 135.8C378.742 136.424 378.658 136.992 378.49 137.504C378.322 138.016 378.078 138.46 377.758 138.836C377.446 139.204 377.07 139.492 376.63 139.7C376.19 139.9 375.69 140 375.13 140H372.502ZM373.63 138.932H374.986C375.506 138.932 375.962 138.816 376.354 138.584C376.746 138.344 377.054 137.992 377.278 137.528C377.502 137.064 377.614 136.488 377.614 135.8C377.614 135.32 377.55 134.888 377.422 134.504C377.302 134.112 377.126 133.78 376.894 133.508C376.662 133.228 376.382 133.016 376.054 132.872C375.734 132.728 375.378 132.656 374.986 132.656H373.63V138.932Z" fill={theme.primary.accent} />
			{/** END Dataset D */}
			
			{/** Dataset E */}
			<path opacity="0.12" d="M352 306C374.368 306 392.5 301.971 392.5 297V339C392.5 343.98 374.5 348 352 348C329.5 348 311.5 343.98 311.5 339V297C311.5 301.971 329.632 306 352 306Z" fill={theme.primary.accent} />
			<mask id="path-371-outside-2_522_11836" maskUnits="userSpaceOnUse" x="309.5" y="286" width="85" height="64" fill="black">
				<rect fill="white" x="309.5" y="286" width="85" height="64" />
				<path d="M352 306C374.368 306 392.5 301.971 392.5 297C392.5 292.029 374.368 288 352 288C329.632 288 311.5 292.029 311.5 297C311.5 301.971 329.632 306 352 306Z" />
				<path d="M392.5 318C392.5 322.98 374.5 327 352 327C329.5 327 311.5 322.98 311.5 318" />
				<path d="M311.5 297V339C311.5 343.98 329.5 348 352 348C374.5 348 392.5 343.98 392.5 339V297" />
			</mask>
			<path d="M394.5 318C394.5 316.895 393.605 316 392.5 316C391.395 316 390.5 316.895 390.5 318H394.5ZM313.5 318C313.5 316.895 312.605 316 311.5 316C310.395 316 309.5 316.895 309.5 318H313.5ZM390.5 297C390.5 297.002 390.5 297.007 390.497 297.018C390.495 297.03 390.488 297.053 390.472 297.089C390.438 297.163 390.363 297.288 390.206 297.459C389.879 297.814 389.301 298.253 388.387 298.733C386.564 299.691 383.795 300.614 380.204 301.412C373.055 303 363.083 304 352 304V308C363.285 308 373.562 306.985 381.072 305.316C384.81 304.486 387.972 303.469 390.248 302.274C391.383 301.677 392.396 300.985 393.148 300.169C393.91 299.341 394.5 298.273 394.5 297H390.5ZM352 304C340.917 304 330.945 303 323.796 301.412C320.206 300.614 317.436 299.691 315.613 298.733C314.699 298.253 314.121 297.814 313.794 297.459C313.637 297.288 313.562 297.163 313.528 297.089C313.512 297.053 313.505 297.03 313.503 297.018C313.5 297.007 313.5 297.002 313.5 297H309.5C309.5 298.273 310.09 299.341 310.852 300.169C311.604 300.985 312.617 301.677 313.752 302.274C316.028 303.469 319.19 304.486 322.928 305.316C330.438 306.985 340.715 308 352 308V304ZM313.5 297C313.5 296.998 313.5 296.993 313.503 296.982C313.505 296.97 313.512 296.947 313.528 296.911C313.562 296.837 313.637 296.712 313.794 296.541C314.121 296.186 314.699 295.747 315.613 295.267C317.436 294.309 320.206 293.386 323.796 292.588C330.945 291 340.917 290 352 290V286C340.715 286 330.438 287.015 322.928 288.684C319.19 289.514 316.028 290.531 313.752 291.726C312.617 292.323 311.604 293.015 310.852 293.831C310.09 294.659 309.5 295.727 309.5 297H313.5ZM352 290C363.083 290 373.055 291 380.204 292.588C383.795 293.386 386.564 294.309 388.387 295.267C389.301 295.747 389.879 296.186 390.206 296.541C390.363 296.712 390.438 296.837 390.472 296.911C390.488 296.947 390.495 296.97 390.497 296.982C390.5 296.993 390.5 296.998 390.5 297H394.5C394.5 295.727 393.91 294.659 393.148 293.831C392.396 293.015 391.383 292.323 390.248 291.726C387.972 290.531 384.81 289.514 381.072 288.684C373.562 287.015 363.285 286 352 286V290ZM390.5 318C390.5 318.001 390.502 318.028 390.471 318.096C390.437 318.171 390.362 318.296 390.206 318.467C389.883 318.821 389.309 319.259 388.402 319.739C386.59 320.696 383.835 321.618 380.253 322.415C373.122 324.002 363.15 325 352 325V329C363.35 329 373.628 327.988 381.122 326.32C384.853 325.489 388.003 324.473 390.27 323.276C391.402 322.678 392.41 321.985 393.159 321.166C393.918 320.336 394.5 319.269 394.5 318H390.5ZM352 325C340.85 325 330.878 324.002 323.747 322.415C320.165 321.618 317.41 320.696 315.598 319.739C314.691 319.259 314.117 318.821 313.794 318.467C313.638 318.296 313.563 318.171 313.529 318.096C313.498 318.028 313.5 318.001 313.5 318H309.5C309.5 319.269 310.082 320.336 310.841 321.166C311.59 321.985 312.598 322.678 313.73 323.276C315.997 324.473 319.147 325.489 322.878 326.32C330.372 327.988 340.65 329 352 329V325ZM309.5 297V339H313.5V297H309.5ZM309.5 339C309.5 340.269 310.082 341.336 310.841 342.166C311.59 342.985 312.598 343.678 313.73 344.276C315.997 345.473 319.147 346.489 322.878 347.32C330.372 348.988 340.65 350 352 350V346C340.85 346 330.878 345.002 323.747 343.415C320.165 342.618 317.41 341.696 315.598 340.739C314.691 340.259 314.117 339.821 313.794 339.467C313.638 339.296 313.563 339.171 313.529 339.096C313.498 339.028 313.5 339.001 313.5 339H309.5ZM352 350C363.35 350 373.628 348.988 381.122 347.32C384.853 346.489 388.003 345.473 390.27 344.276C391.402 343.678 392.41 342.985 393.159 342.166C393.918 341.336 394.5 340.269 394.5 339H390.5C390.5 339.001 390.502 339.028 390.471 339.096C390.437 339.171 390.362 339.296 390.206 339.467C389.883 339.821 389.309 340.259 388.402 340.739C386.59 341.696 383.835 342.618 380.253 343.415C373.122 345.002 363.15 346 352 346V350ZM394.5 339V297H390.5V339H394.5Z" fill={theme.primary.accent} mask="url(#path-371-outside-2_522_11836)" />
			<path d="M327.936 326V317.6H330.564C331.092 317.6 331.572 317.708 332.004 317.924C332.444 318.132 332.824 318.428 333.144 318.812C333.472 319.196 333.724 319.644 333.9 320.156C334.084 320.66 334.176 321.208 334.176 321.8C334.176 322.424 334.092 322.992 333.924 323.504C333.756 324.016 333.512 324.46 333.192 324.836C332.88 325.204 332.504 325.492 332.064 325.7C331.624 325.9 331.124 326 330.564 326H327.936ZM329.064 324.932H330.42C330.94 324.932 331.396 324.816 331.788 324.584C332.18 324.344 332.488 323.992 332.712 323.528C332.936 323.064 333.048 322.488 333.048 321.8C333.048 321.32 332.984 320.888 332.856 320.504C332.736 320.112 332.56 319.78 332.328 319.508C332.096 319.228 331.816 319.016 331.488 318.872C331.168 318.728 330.812 318.656 330.42 318.656H329.064V324.932ZM337.325 326.108C336.933 326.108 336.581 326.044 336.269 325.916C335.965 325.78 335.725 325.576 335.549 325.304C335.381 325.024 335.297 324.68 335.297 324.272C335.297 323.648 335.557 323.168 336.077 322.832C336.597 322.496 337.309 322.328 338.213 322.328H339.401H340.457V326.012H339.473L339.401 325.124C339.185 325.428 338.909 325.668 338.573 325.844C338.237 326.02 337.821 326.108 337.325 326.108ZM337.469 325.184C337.765 325.184 338.061 325.128 338.357 325.016C338.653 324.904 338.901 324.716 339.101 324.452C339.301 324.188 339.401 323.828 339.401 323.372V323.168H338.249C337.601 323.168 337.121 323.264 336.809 323.456C336.497 323.648 336.341 323.916 336.341 324.26C336.341 324.572 336.441 324.804 336.641 324.956C336.849 325.108 337.125 325.184 337.469 325.184ZM339.401 322.328C339.401 321.792 339.285 321.404 339.053 321.164C338.829 320.924 338.473 320.804 337.985 320.804C337.673 320.804 337.421 320.852 337.229 320.948C337.037 321.036 336.889 321.16 336.785 321.32C336.689 321.472 336.621 321.644 336.581 321.836L335.537 321.8C335.585 321.456 335.701 321.14 335.885 320.852C336.069 320.556 336.329 320.32 336.665 320.144C337.001 319.96 337.417 319.868 337.913 319.868C338.465 319.868 338.929 319.968 339.305 320.168C339.681 320.368 339.965 320.652 340.157 321.02C340.357 321.38 340.457 321.816 340.457 322.328V322.508H339.401V322.328ZM341.444 320H345.236V320.972H341.444V320ZM342.56 323.6H343.616V324.032C343.616 324.216 343.624 324.384 343.64 324.536C343.664 324.68 343.728 324.796 343.832 324.884C343.944 324.972 344.128 325.016 344.384 325.016H345.236V326H343.94C343.58 326 343.3 325.916 343.1 325.748C342.9 325.58 342.76 325.344 342.68 325.04C342.6 324.736 342.56 324.376 342.56 323.96V323.6ZM343.616 323.6H342.56V318.308H343.616V323.6ZM348.177 326.108C347.785 326.108 347.433 326.044 347.121 325.916C346.817 325.78 346.577 325.576 346.401 325.304C346.233 325.024 346.149 324.68 346.149 324.272C346.149 323.648 346.409 323.168 346.929 322.832C347.449 322.496 348.161 322.328 349.065 322.328H350.253H351.309V326.012H350.325L350.253 325.124C350.037 325.428 349.761 325.668 349.425 325.844C349.089 326.02 348.673 326.108 348.177 326.108ZM348.321 325.184C348.617 325.184 348.913 325.128 349.209 325.016C349.505 324.904 349.753 324.716 349.953 324.452C350.153 324.188 350.253 323.828 350.253 323.372V323.168H349.101C348.453 323.168 347.973 323.264 347.661 323.456C347.349 323.648 347.193 323.916 347.193 324.26C347.193 324.572 347.293 324.804 347.493 324.956C347.701 325.108 347.977 325.184 348.321 325.184ZM350.253 322.328C350.253 321.792 350.137 321.404 349.905 321.164C349.681 320.924 349.325 320.804 348.837 320.804C348.525 320.804 348.273 320.852 348.081 320.948C347.889 321.036 347.741 321.16 347.637 321.32C347.541 321.472 347.473 321.644 347.433 321.836L346.389 321.8C346.437 321.456 346.553 321.14 346.737 320.852C346.921 320.556 347.181 320.32 347.517 320.144C347.853 319.96 348.269 319.868 348.765 319.868C349.317 319.868 349.781 319.968 350.157 320.168C350.533 320.368 350.817 320.652 351.009 321.02C351.209 321.38 351.309 321.816 351.309 322.328V322.508H350.253V322.328ZM355.126 326.132C354.606 326.132 354.154 326.044 353.77 325.868C353.394 325.692 353.098 325.452 352.882 325.148C352.674 324.836 352.566 324.48 352.558 324.08H353.614C353.614 324.336 353.686 324.548 353.83 324.716C353.974 324.876 354.158 324.996 354.382 325.076C354.606 325.156 354.846 325.196 355.102 325.196C355.366 325.196 355.606 325.164 355.822 325.1C356.038 325.036 356.214 324.936 356.35 324.8C356.486 324.664 356.554 324.496 356.554 324.296C356.554 324.08 356.47 323.904 356.302 323.768C356.134 323.624 355.918 323.532 355.654 323.492C355.51 323.476 355.354 323.456 355.186 323.432C355.018 323.408 354.85 323.388 354.682 323.372C354.514 323.348 354.362 323.328 354.226 323.312C353.786 323.24 353.434 323.056 353.17 322.76C352.906 322.464 352.774 322.116 352.774 321.716C352.774 321.34 352.878 321.016 353.086 320.744C353.294 320.464 353.574 320.248 353.926 320.096C354.278 319.944 354.666 319.868 355.09 319.868C355.53 319.868 355.918 319.944 356.254 320.096C356.598 320.248 356.87 320.468 357.07 320.756C357.27 321.036 357.374 321.376 357.382 321.776H356.326C356.302 321.488 356.178 321.252 355.954 321.068C355.738 320.884 355.454 320.792 355.102 320.792C354.902 320.792 354.702 320.82 354.502 320.876C354.31 320.932 354.146 321.024 354.01 321.152C353.882 321.28 353.818 321.452 353.818 321.668C353.818 321.86 353.882 322.016 354.01 322.136C354.146 322.256 354.35 322.332 354.622 322.364C354.662 322.372 354.766 322.388 354.934 322.412C355.102 322.436 355.29 322.464 355.498 322.496C355.706 322.52 355.882 322.544 356.026 322.568C356.346 322.624 356.622 322.728 356.854 322.88C357.094 323.024 357.278 323.212 357.406 323.444C357.534 323.668 357.598 323.924 357.598 324.212C357.598 324.644 357.486 325.004 357.262 325.292C357.038 325.572 356.738 325.784 356.362 325.928C355.994 326.064 355.582 326.132 355.126 326.132ZM362.626 324.212L363.622 324.356C363.518 324.716 363.358 325.032 363.142 325.304C362.926 325.568 362.65 325.772 362.314 325.916C361.986 326.06 361.598 326.128 361.15 326.12C360.662 326.12 360.226 326.004 359.842 325.772C359.458 325.54 359.158 325.192 358.942 324.728C358.734 324.264 358.63 323.696 358.63 323.024C358.63 322.328 358.734 321.748 358.942 321.284C359.158 320.812 359.458 320.46 359.842 320.228C360.226 319.996 360.662 319.88 361.15 319.88C361.478 319.88 361.794 319.936 362.098 320.048C362.402 320.152 362.678 320.328 362.926 320.576C363.174 320.824 363.366 321.164 363.502 321.596C363.646 322.02 363.71 322.552 363.694 323.192H362.686C362.702 322.576 362.642 322.096 362.506 321.752C362.37 321.408 362.182 321.164 361.942 321.02C361.71 320.876 361.446 320.804 361.15 320.804C360.854 320.804 360.606 320.872 360.406 321.008C360.214 321.136 360.058 321.308 359.938 321.524C359.826 321.74 359.742 321.98 359.686 322.244C359.638 322.508 359.614 322.768 359.614 323.024C359.614 323.264 359.638 323.512 359.686 323.768C359.742 324.024 359.826 324.26 359.938 324.476C360.05 324.684 360.202 324.856 360.394 324.992C360.594 325.12 360.846 325.184 361.15 325.184C361.462 325.184 361.714 325.14 361.906 325.052C362.098 324.964 362.25 324.844 362.362 324.692C362.474 324.54 362.562 324.38 362.626 324.212ZM358.882 322.352H363.346V323.192H358.882V322.352ZM364.366 320H368.158V320.972H364.366V320ZM365.482 323.6H366.538V324.032C366.538 324.216 366.546 324.384 366.562 324.536C366.586 324.68 366.65 324.796 366.754 324.884C366.866 324.972 367.05 325.016 367.306 325.016H368.158V326H366.862C366.502 326 366.222 325.916 366.022 325.748C365.822 325.58 365.682 325.344 365.602 325.04C365.522 324.736 365.482 324.376 365.482 323.96V323.6ZM366.538 323.6H365.482V318.308H366.538V323.6ZM372.502 317.6H373.63V326H372.502V317.6ZM372.742 321.128H376.546V322.184H372.742V321.128ZM372.742 317.6H377.722V318.656H372.742V317.6ZM372.742 324.932H377.722V326H372.742V324.932Z" fill={theme.primary.accent} />
			{/** END Dataset E */}
		</motion.g>
	);
}

export default DerivedDatasets;