import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from 'three';

const COUNT = 24;

const createDefaults = () => {
	// 6 coordinates per line, (x, y, z, coordinates for each point which are then connected to create a line)
	const position = new Float32Array(COUNT * 6);

	for (let i = 0; i < COUNT; i++) {
		position.set(
			[
				0,
				0,
				0,
				0,
				0,
				0
			],
			i * 6
		);
	}

	return {
		position
	};
}

const { position: INITIAL_POS } = createDefaults();

function map(val: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) {
	return ((outputMax - outputMin) * ((val - inputMin) / (inputMax - inputMin))) + outputMin;
}

const Particle = ({ order, alternate, color, opacity, size, radius }: {
	order: number,
	alternate: boolean,
	color: number,
	opacity: number,
	size: number,
	radius: number
}) => {
	const mesh = useRef<THREE.Mesh>(null);

	useFrame(({ clock }) => {
		if (!mesh.current) return;
		let elapsedMs = clock.getElapsedTime() * 750;
		let angle = map(order, 0, 1, -Math.cos(elapsedMs * 0.0015) * (Math.PI * 1.5), Math.sin(elapsedMs * 0.0015) * (Math.PI * 1.5));
		angle += alternate ? Math.PI : 0;

		let x = Math.cos(angle) * radius;
		let y = map(order, 0, 1, -10, 10);
		let z = Math.sin(angle) * radius;

		mesh.current.position.x = x;
		mesh.current.position.y = y;
		mesh.current.position.z = z;

		mesh.current.scale.set(size, size, size);
	});

	return (
		<mesh ref={mesh}>
			<sphereGeometry />
			<meshBasicMaterial 
				color={color} 
				opacity={opacity}
				transparent
				depthTest={false}
				precision="lowp"
			/>
		</mesh>
	);
};

const Helix = () => {
	const particles = useMemo(() => {
		let arr = [];

		for (let i = 0; i < COUNT; i++) {
			arr.push({
				order: i / (COUNT - 1),
				alternate: false,
				color: 0xCFCDF3,
				opacity: 1,
				size: 0.1,
				radius: 4,
			});

			arr.push({
				order: i / (COUNT - 1),
				alternate: true,
				color: 0xCFCDF3,
				opacity: 1,
				size: 0.1,
				radius: 4,
			});
		}

		return arr;
	}, []);

	return (
		<group>
			{particles.map(({ order, alternate, color, opacity, size, radius }) => 
				<Particle 
					order={order} 
					alternate={alternate}
					color={color}
					opacity={opacity}
					size={size}
					radius={radius}
				/>
			)}
		</group>
	);
};

export default Helix;