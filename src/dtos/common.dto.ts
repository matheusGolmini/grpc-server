import { IsUUID } from "class-validator";

export class EmptyDto {}

export class GetDto {
    @IsUUID()
    id: string;
}

export class DeleteDto extends GetDto {}