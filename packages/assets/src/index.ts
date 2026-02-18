import Chair from "./svgs/seats/chair.svg";
import ArmChairA from "./svgs/seats/arm-chair-a.svg";
import ArmChairB from "./svgs/seats/arm-chair-b.svg";
import ArmChairC from "./svgs/seats/arm-chair-c.svg";
import SingleDoor from "./svgs/doors/single-door.svg";
import DoubleDoor from "./svgs/doors/double-door.svg";
import SlidingDoor from "./svgs/doors/sliding-door.svg";
import DirectionArrow from "./svgs/misc/direction-arrow.svg";
import ExitSign from "./svgs/misc/exit-sign.svg";

import ChairRaw from "./svgs/seats/chair.svg?raw";
import ArmChairARaw from "./svgs/seats/arm-chair-a.svg?raw";
import ArmChairBRaw from "./svgs/seats/arm-chair-b.svg?raw";
import ArmChairCRaw from "./svgs/seats/arm-chair-c.svg?raw";
import SingleDoorRaw from "./svgs/doors/single-door.svg?raw";
import DoubleDoorRaw from "./svgs/doors/double-door.svg?raw";
import SlidingDoorRaw from "./svgs/doors/sliding-door.svg?raw";
import DirectionArrowRaw from "./svgs/misc/direction-arrow.svg?raw";
import ExitSignRaw from "./svgs/misc/exit-sign.svg?raw";

export const Images = {} as const;

export const Svg = {
	Chair,
	ArmChairA,
	ArmChairB,
	ArmChairC,
	SingleDoor,
	DoubleDoor,
	SlidingDoor,
	DirectionArrow,
	ExitSign,

	ChairRaw,
	ArmChairARaw,
	ArmChairBRaw,
	ArmChairCRaw,
	SingleDoorRaw,
	DoubleDoorRaw,
	SlidingDoorRaw,
	DirectionArrowRaw,
	ExitSignRaw,
} as const;

export { Icons } from "./icons";
