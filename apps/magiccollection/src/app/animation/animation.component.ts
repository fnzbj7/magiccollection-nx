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

    minScale = 0.3; // Minimum scale when stone is at the top
    maxScale = 0.55; // Maximum scale when stone is at the bottom

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
        this.stone.scale.set(this.calcStoneScale());

        this.stage.addChild(this.stone);

        // stone.scale.set(10,10);
        this.stone.interactive = true;
        this.stone.buttonMode = true;

        // Create a Graphics object for the dashed line
        const dashedLine = new PIXI.Graphics();

        // Define the line properties
        const lineColor = 0xffbbbb; // Color of the dashed line
        const lineWidth = 2; // Width of the dashed line
        const dashSize = 10; // Length of each dash
        const gapSize = 5; // Length of each gap between dashes

        // Draw the dashed line
        dashedLine.lineStyle(lineWidth, lineColor);
        // dashedLine.moveTo(0, this.height / 2);
        // dashedLine.lineTo(this.width, this.height / 2);

        const lineLength = this.width; // Length of the dashed line
        const totalSegments = Math.ceil(lineLength / (dashSize + gapSize)); // Calculate the total number of line segments

        for (let i = 0; i < totalSegments; i++) {
            const startX = (dashSize + gapSize) * i;
            const endX = startX + dashSize;
            dashedLine.moveTo(startX, this.height / 2);
            dashedLine.lineTo(Math.min(endX, lineLength), this.height / 2);
        }

        // Add the dashed line to the stage
        this.stage.addChild(dashedLine);

        this.renderer.render(this.stage);

        let isDragging = false;
        const startDragPos = new PIXI.Point();
        const startSpritePos = new PIXI.Point();
        const velocity = new PIXI.Point();
        const airFriction = 0.98; // Friction when stone is in the air
        const groundFriction = 0.8; // Friction when stone is on the ground
        const gravity = 0.5;
        const dragPositions: { x: number; y: number; time: number }[] = [];
        const dragPositionsMaxLength = 20;

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
                const timeWindow = 100; // Adjust the time window as needed (e.g., 100 or 200 milliseconds)

                // Find the first position within the time window
                let index = dragPositions.length - 2;
                while (index >= 0) {
                    const position = dragPositions[index];
                    const elapsed = lastPosition.time - position.time;

                    if (elapsed > timeWindow) {
                        break;
                    }
                    avgVelocityX = (lastPosition.x - position.x) / elapsed;
                    avgVelocityY = (lastPosition.y - position.y) / elapsed;
                    index--;
                }
            }

            // Apply the scaling factor to make the average velocity stronger
            const scalingFactor = 7; // Adjust the scaling factor as needed
            velocity.set(avgVelocityX * scalingFactor, avgVelocityY * scalingFactor);
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

            this.stone.scale.set(this.calcStoneScale());

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

            this.renderer.render(this.stage);
        };

        this.stone.on('pointerdown', onDragStart);
        this.stone.on('pointerup', onDragEnd);
        this.stone.on('pointerupoutside', onDragEnd);
        this.stone.on('pointermove', onDragMove);

        this.ticker.add(update);

        this.ticker.start();
    }

    private calcStoneScale(): number {
        // Calculate the scale factor based on the stone's y-axis position
        let yNormalized =
            (this.stone.position.y - this.stone.height / 2) / (this.height - this.stone.height); // Normalize the y-axis position
        yNormalized = Math.max(0, Math.min(1, yNormalized));
        return (this.maxScale - this.minScale) * (1 - yNormalized) + this.minScale; // Linear interpolation
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
