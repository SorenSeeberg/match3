import { Stage } from "./stage";
import { Vector2d, ZERO_VECTOR2D } from "./types";
import { v4 as uuidv4 } from "uuid";

interface SpriteProps {
    size?: Vector2d;
    position?: Vector2d;
    velocity?: Vector2d;
    color?: string;
    children?: Array<ISprite>;
}

export interface ISprite {
    getId(): string;
    getSize(): Vector2d;
    setSize(size: Vector2d): void;
    getPosition(): Vector2d;
    setPosition(position: Vector2d): void;
    getVelocity(): Vector2d;
    setVelocity(velocity: Vector2d): void;
    setColor(color: string): void;
    getColor(): string;
    children: Array<ISprite>;
    draw(): void;
}

export class Sprite implements ISprite {
    protected id: string;
    protected size: Vector2d;
    protected position: Vector2d;
    protected velocity: Vector2d;
    protected color: string;
    children: Array<ISprite>;

    constructor({
        size = { x: 50, y: 50 },
        position = ZERO_VECTOR2D,
        velocity = ZERO_VECTOR2D,
        color = "white",
        children = [],
    }: SpriteProps) {
        this.id = uuidv4();
        this.size = size;
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.children = children;
    }
    getSize(): Vector2d {
        return this.size;
    }

    setSize(size: Vector2d): void {
        this.size = size;
    }

    getPosition(): Vector2d {
        return this.position;
    }

    setPosition(position: Vector2d): void {
        this.position = position;
    }

    getVelocity(): Vector2d {
        return this.velocity;
    }

    setVelocity(velocity: Vector2d): void {
        this.velocity = velocity;
    }

    getId(): string {
        return this.id;
    }

    getColor(): string {
        return this.color;
    }

    setColor(color: string) {
        this.color = color;
    }

    draw() {
        Stage.getContext().fillStyle = this.color;
        Stage.getContext().fillRect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
    }
}
