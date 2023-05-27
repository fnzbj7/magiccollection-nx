import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
    selector: 'app-animation',
    templateUrl: './animation.component.html',
    styleUrls: ['./animation.component.css'],
})
export class AnimationComponent implements AfterViewInit {
    canvas!: HTMLCanvasElement;
    renderer!: PIXI.Renderer;
    stage!: PIXI.Container;
    loader!: PIXI.Loader;
    ticker!: PIXI.Ticker;

    stone!: PIXI.Sprite;

    width!: number;
    height!: number;

    dragging = false;

    ngAfterViewInit(): void {
        this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

        this.width = window.innerWidth;
        this.height = window.innerHeight - 115;

        this.renderer = new PIXI.Renderer({
            view: this.canvas,
            width: this.width,
            height: this.height,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        this.stage = new PIXI.Container();
        this.ticker = new PIXI.Ticker();
        this.loader = PIXI.Loader.shared;

        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight - 115;

            this.renderer.resize(this.width, this.height);
        });

        this.loader.reset();
        this.loader = this.loader.add('stone', 'assets/stone_throw.png');
        this.loader.load(this.startGame.bind(this));
    }

    startGame() {
        const stoneTexture = this.loader.resources['stone'].texture;
        this.stone = new PIXI.Sprite(stoneTexture);
        this.stone.position.set(200, 200);
        this.stone.anchor.set(0.5);
        this.stone.height = 60;
        this.stone.width = 60;

        this.stage.addChild(this.stone);
        this.renderer.render(this.stage);
        // stone.scale.set(10,10);
        this.stone.interactive = true;
        this.stone.buttonMode = true;

        let isDragging = false;
        const startDragPos = new PIXI.Point();
        const startSpritePos = new PIXI.Point();
        const velocity = new PIXI.Point();
        const airFriction = 0.98; // Friction when stone is in the air
        const groundFriction = 0.8; // Friction when stone is on the ground
        const gravity = 0.5;
        const dragPositions: { x: number; y: number; time: number }[] = [];
        const dragPositionsMaxLength = 200;

        const onDragStart = (event: PIXI.InteractionEvent) => {
            isDragging = true;
            startDragPos.copyFrom(event.data.global);
            startSpritePos.copyFrom(this.stone.position);
            velocity.set(0);
        };

        const onDragEnd = () => {
            isDragging = false;

            // Calculate the average velocity from the stored positions
            let avgVelocityX = 0;
            let avgVelocityY = 0;

            if (dragPositions.length > 1) {
                const lastPosition = dragPositions[dragPositions.length - 1];
                const startTime = performance.now() - 10; // Adjust the time window as needed

                // Find the first position within the time window
                let index = dragPositions.length - 2;
                while (index >= 0 && performance.now() - startTime < dragPositionsMaxLength) {
                    const position = dragPositions[index];
                    const elapsed = lastPosition.time - position.time;
                    if (elapsed > 0) {
                        avgVelocityX = ((lastPosition.x - position.x) / elapsed) * 6;
                        avgVelocityY = ((lastPosition.y - position.y) / elapsed) * 6;
                        break;
                    }
                    index--;
                }
            }

            // Apply the average velocity to the stone
            velocity.set(avgVelocityX, avgVelocityY);
        };

        const onDragMove = (event: PIXI.InteractionEvent) => {
            if (isDragging) {
                const newPosition = event.data.global.clone();
                this.stone.position.copyFrom(newPosition);

                // Store the current position for calculating average velocity
                dragPositions.push({ x: newPosition.x, y: newPosition.y, time: performance.now() });

                // Remove older positions if the array exceeds the maximum length
                if (dragPositions.length > dragPositionsMaxLength) {
                    dragPositions.shift();
                }
            }
        };

        const update = () => {
            const currentFriction =
                this.stone.position.y + this.stone.height / 2 >= this.height
                    ? groundFriction
                    : airFriction;

            if (!isDragging) {
                velocity.x *= currentFriction;
                velocity.y += gravity;
            }

            // Update stone position
            this.stone.position.x += velocity.x;
            this.stone.position.y += velocity.y;

            // Check for collisions with screen boundaries
            if (this.stone.position.x < this.stone.width / 2) {
                this.stone.position.x = this.stone.width / 2;
                velocity.x *= -0.8; // Bounce back with reduced velocity
            } else if (this.stone.position.x > this.width - this.stone.width / 2) {
                this.stone.position.x = this.width - this.stone.width / 2;
                velocity.x *= -0.8;
            }

            if (this.stone.position.y > this.height - this.stone.height / 2) {
                this.stone.position.y = this.height - this.stone.height / 2;
                velocity.y *= -0.2;
            }

            // Slow down the stone when it's on the ground and not being dragged
            if (!isDragging && Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1) {
                velocity.set(0);
            }

            this.renderer.render(this.stone);
        };

        this.stone.on('pointerdown', onDragStart);
        this.stone.on('pointerup', onDragEnd);
        this.stone.on('pointerupoutside', onDragEnd);
        this.stone.on('pointermove', onDragMove);

        this.ticker.add(update);

        this.ticker.start();
    }

    pointerDown(event: PIXI.InteractionEvent) {
        this.dragging = true;
        this.pointerMove(event);
    }

    pointerMove(event: PIXI.InteractionEvent) {
        if (this.dragging) {
            this.stone.x = event.data.global.x;
            this.stone.y = event.data.global.y;
            this.renderer.render(this.stone);
        }
    }

    pointerUp(event: PIXI.InteractionEvent) {
        this.dragging = false;
    }
}
