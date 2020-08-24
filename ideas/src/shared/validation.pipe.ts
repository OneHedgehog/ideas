import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform
} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        if(value instanceof  Object && this.isEmpty(value)) {
            throw new HttpException('Validation failed: No body submitted', HttpStatus.BAD_REQUEST);
        }

        const metatype = metadata.metatype;

        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const formattedErrors = this.formErrors(errors);
            throw new HttpException(`Validation failed ${formattedErrors}`, HttpStatus.BAD_REQUEST);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private formErrors(errors: any[]) {
        return errors.map(err => {
            for (let prop in err.constraints) {
                return err.constraints[prop];
            }
        }).join('')
    }

    private isEmpty(value: any) {
        return Object.keys(value).length > 0
    }
}
