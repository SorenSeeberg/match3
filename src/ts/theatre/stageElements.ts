import { Sprite } from "./sprite";
import { v4 as uuidv4 } from "uuid";
import { Vector2d, ZERO_VECTOR2D } from "./types";

export interface IStageElement {
    getId(): string;
    getSprite(): Sprite;
}

interface StageElementProps {
    size?: Vector2d;
    position?: Vector2d;
    velocity?: Vector2d;
    color?: string;
}

class StageElement implements IStageElement {
    protected id: string;
    protected sprite: Sprite;

    constructor({ size, position, velocity, color }: StageElementProps) {
        this.id = uuidv4();
        this.sprite = new Sprite({
            size,
            position,
            velocity,
            color,
        });
    }

    getId() {
        return this.id;
    }

    getSprite(): Sprite {
        return this.sprite;
    }
}

export class Actor extends StageElement {
    constructor({
        size = { x: 48, y: 48 },
        position = ZERO_VECTOR2D,
        velocity = ZERO_VECTOR2D,
        color = "blue",
    }: StageElementProps) {
        super({ size, position, velocity, color });
    }

    onClick(point: Vector2d, callback: () => void): void {
        if (this.isPointInRect(point)) {
            callback();
            this.getSprite().setColor("green");
        }
    }

    isPointInRect(point: Vector2d): boolean {
        const sprite = this.getSprite();
        const position = sprite.getPosition();
        const size = sprite.getSize();

        const x1 = point.x >= position.x;
        const y1 = point.y >= position.y;
        const x2 = point.x <= position.x + size.x;
        const y2 = point.y <= position.y + size.y;

        return x1 && y1 && x2 && y2;
    }
}

export class StaticProp extends StageElement {
    constructor({
        size = { x: 48, y: 48 },
        position = ZERO_VECTOR2D,
        velocity = ZERO_VECTOR2D,
        color = "green",
    }: StageElementProps) {
        super({ size, position, velocity, color });
    }
}
