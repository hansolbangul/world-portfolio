import {
	AnimationMixer
} from 'three';
import gsap from 'gsap';

export class Player {
	constructor(info) {
		this.moving = false;

		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				glb.scene.traverse(child => {
					if (child.isMesh) {
						child.castShadow = true;
					}
				});
		
				this.modelMesh = glb.scene.children[0];
				this.modelMesh.position.set(0, 0.3, 0);
				// this.modelMesh.position.y = 0.3;
				this.modelMesh.name = 'ilbuni';
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);

				gsap.from(
					this.modelMesh.position,
					{
						duration: 1.8,
						y: 10,
					}
				)

				this.actions = [];
		
				this.mixer = new AnimationMixer(this.modelMesh);
				this.actions[0] = this.mixer.clipAction(glb.animations[0]);
				this.actions[1] = this.mixer.clipAction(glb.animations[1]);
				this.actions[0].play();
			}
		);
	}
}
