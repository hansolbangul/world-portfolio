import {
	AnimationMixer
} from 'three';

export class Rotates {
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
                this.modelMesh.position.set(5, 1, -4);
				this.modelMesh.name = info.name;
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);

				this.actions = [];
				this.mixer = new AnimationMixer(this.modelMesh);

				for(let i = 0; i < glb.animations.length; i++){
					this.actions[i] = this.mixer.clipAction(glb.animations[i]);
					if(i === 0) continue;
					this.actions[i].repetitions = 1;
				}
                // console.log(this.actions);
				
				// if(this.actions.length) this.actions[0].play();

				this.modelMesh.actions = this.actions;
				info.characters.push(this.modelMesh);
			}
		);
	}
}
