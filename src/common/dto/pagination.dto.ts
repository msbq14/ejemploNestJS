
import { IsNumber, IsPositive } from "class-validator";

export class PaginationDto{
    
    @IsNumber()
    @IsPositive()
    itemsPage:number=10;

    @IsNumber()
    @IsPositive()
    page:number=1;
}