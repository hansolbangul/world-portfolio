import {
	AnimationMixer
} from 'three';

export class Models {
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
				this.modelMesh.position.x = 1 * info.index;
				this.modelMesh.position.y = 0.3;
				this.modelMesh.name = info.name;
				// this.modelMesh.scale.set(info.scaleX || 0.1, info.scaleY || 0.1, info.scaleZ || 0.1);
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
