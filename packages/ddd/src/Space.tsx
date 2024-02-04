import { useEffect, useRef } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
//@ts-ignore
import Random from 'canvas-sketch-util/random';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

const COUNT = 75;

const createProps = () => {
	let velocity = Random.range(0.0004, 0.001);
	return {
		x: Random.range(-120, 120),
		y: Random.range(-80, 80),
		z: Random.range(-1000, -200),
		vS: velocity,
		vE: velocity,
		a: Random.range(0.02, 0.05)
	};
}

const createDefaults = () => {
	// 6 points per line, (x, y, z, coordinated for each point which are then connected to create a line)
	const position = new Float32Array(COUNT * 6);
	const velocity = new Float32Array(COUNT * 2);
	const acceleration = new Float32Array(COUNT);

	for (let i = 0; i < COUNT; i++) {

		let { x, y, z, vS, vE, a } = createProps();

		position.set(
			[
				x,
				y,
				z,
				x,
				y,
				z
			],
			i * 6
		);

		velocity.set([vS, vE], i * 2);
		acceleration.set([a], i);
	}

	return {
		position,
		velocity,
		acceleration,
	};
}

const { acceleration: INITIAL_ACC, position: INITIAL_POS, velocity: INITIAL_VEL } = createDefaults();

const Stars = () => {
	const linesRef = useRef<THREE.LineSegments>(null);

	useFrame(() => {
		if (!linesRef.current) return;

		const { geometry } = linesRef.current;
		let { count, array: pos } = geometry.attributes.position as THREE.BufferAttribute;
		let { array: vel } = geometry.attributes.velocity as THREE.BufferAttribute;
		let { array: acc } = geometry.attributes.acceleration as THREE.BufferAttribute;

		for (let i = 0; i < count; i++) {
			let pos_idx = 6 * i;
			let vel_idx = 2 * i;

			(vel as Array<number>)[vel_idx] += acc[i];
			(vel as Array<number>)[vel_idx + 1] += (acc[i] - 0.0006); // make the end point slightly slower 

			// z start - increase the value by the velocity for the start point
			(pos as Array<number>)[pos_idx + 2] += vel[vel_idx];
			// z end - increase the value by the velocity for the end point (We cap the line length at 240)
			(pos as Array<number>)[pos_idx + 5] += Math.max(vel[vel_idx] - 240, vel[vel_idx + 1]);

			// When z end is > 200
			if (pos[pos_idx + 5] > 200) {
				let { x, y, z, vS, vE, a } = createProps();

				// end x/y start x/y
				(pos as Array<number>)[pos_idx + 3] = (pos as Array<number>)[pos_idx] = x;
				(pos as Array<number>)[pos_idx + 4] = (pos as Array<number>)[pos_idx + 1] = y;

				// end z start z
				(pos as Array<number>)[pos_idx + 5] = (pos as Array<number>)[pos_idx + 2] = z;

				// Reset velocity with new random number
				(vel as Array<number>)[vel_idx] = vS;
				// Set the end-point velocity to a random number slightly slower than the new start point velocity
				(vel as Array<number>)[vel_idx + 1] = vE;

				(acc as Array<number>)[i] = a;
			}

		}
		geometry.attributes.velocity.needsUpdate = true;
		geometry.attributes.position.needsUpdate = true;
	});

	return (
		<lineSegments ref={linesRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					array={INITIAL_POS}
					itemSize={3}
					count={COUNT}
				/>
				<bufferAttribute
					attach="attributes-velocity"
					array={INITIAL_VEL}
					itemSize={2}
					count={COUNT}
				/>
				<bufferAttribute
					attach="attributes-acceleration"
					array={INITIAL_ACC}
					itemSize={1}
					count={COUNT}
				/>
			</bufferGeometry>
			<lineBasicMaterial linecap="round" linewidth={2} color={0xBCB8F4} />
		</lineSegments>
	);
}

const Space = () => {
	const { camera, gl } = useThree();
	
	useEffect(() => {
		gl.setClearColor(0x0d121b);
	}, [camera, gl]);

	return (
		<Stars />
	)
}

export default Space;