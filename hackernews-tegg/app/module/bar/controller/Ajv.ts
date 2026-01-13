import { Type, Static, TransformEnum } from 'egg/ajv';
import { HTTPController, HTTPMethod, HTTPMethodEnum, HTTPBody } from 'egg';

const SyncPackageTaskSchema = Type.Object({
    name: Type.String(
        {
            transform:TransformEnum.trim,
            minLength:1,
            maxLength:200,
        }
    ),
    job: Type.String(),
    age: Type.Number({minimum:18}),
    sb: Type.Boolean(),
    happy: Type.Optional(Type.Boolean()),
})

interface SyncPackageTask extends Static<typeof SyncPackageTaskSchema>{}

@HTTPController({path:'/ajv'})
export default class AjvController{
    @HTTPMethod({
        method:HTTPMethodEnum.POST,
        path:'/sync-package-task',
    })
    async createSyncPackageTask(@HTTPBody() task: SyncPackageTask){
        // 手动验证规则
        const errors: string[] = [];

        // 验证 name
        if (!task.name || task.name.trim().length < 1) {
            errors.push('name must have at least 1 character');
        }
        if (task.name && task.name.length > 200) {
            errors.push('name must not exceed 200 characters');
        }

        // 验证 job
        if (!task.job || typeof task.job !== 'string') {
            errors.push('job is required and must be a string');
        }

        // 验证 age
        if (typeof task.age !== 'number') {
            errors.push('age must be a number');
        } else if (task.age < 18) {
            errors.push('age must be >= 18');
        }

        // 验证 sb
        if (typeof task.sb !== 'boolean') {
            errors.push('sb must be a boolean');
        }

        // 如果有错误，返回错误响应
        if (errors.length > 0) {
            return {
                success: false,
                errors: errors,
                message: 'Validation failed'
            };
        }

        return {
            success: true,
            data: task,
            message: 'Data validated and received successfully'
        };
    }

}
