import {
	AnimationMixer
} from 'three';

export class DogShiba {
	constructor(info) {
		this.x = info.x;
		this.y = info.y;
		this.z = info.z;

		this.visible = false;

		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				glb.scene.traverse(child => {
					if (child.isMesh) {
						child.castShadow = true;
					}
				});
                console.log(glb);
				this.modelMesh = glb.scene.children[0];
				this.modelMesh.castShadow = true;
				this.modelMesh.position.set(this.x, this.y, this.z);
                this.modelMesh.scale.set(0.03, 0.03, 0.03);
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);

				this.actions = [];
		
				this.mixer = new AnimationMixer(this.modelMesh);
				this.actions[0] = this.mixer.clipAction(glb.animations[0]);
				this.actions[1] = this.mixer.clipAction(glb.animations[1]);
				this.actions[2] = this.mixer.clipAction(glb.animations[2]);
				this.actions[3] = this.mixer.clipAction(glb.animations[3]);
				this.actions[4] = this.mixer.clipAction(glb.animations[4]);
				this.actions[2].play();
			}
		);
	}
}
