"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptsController = void 0;
const common_1 = require("@nestjs/common");
const create_prompt_dto_1 = require("./dtos/create-prompt.dto");
const update_prompt_dto_1 = require("./dtos/update-prompt.dto");
const prompts_services_1 = require("./prompts.services");
const auth_guard_1 = require("../guards/auth.guard");
const current_user_decorator_1 = require("../users/decorators/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const prompts_dto_1 = require("./dtos/prompts.dto");
const get_prompts_dto_1 = require("./dtos/get-prompts.dto");
let PromptsController = class PromptsController {
    constructor(promptService) {
        this.promptService = promptService;
    }
    findAll() {
        return this.promptService.findAll();
    }
    async getPrompt(query) {
        let prompt;
        if (query.id) {
            prompt = await this.promptService.findOne(+query.id);
        }
        if (query.author) {
            prompt = await this.promptService.findByAuthor(+query.author);
        }
        if (query.category) {
            prompt = await this.promptService.findByCategory(query.category);
        }
        if (!prompt) {
            throw new common_1.NotFoundException('No prompts found');
        }
        return prompt;
    }
    createPrompt(body, user) {
        return this.promptService.create(body, user);
    }
    removePrompt(id, user) {
        return this.promptService.remove(id, user.id);
    }
    updatePrompt(id, body, user) {
        return this.promptService.update(id, body, user.id);
    }
};
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_prompts_dto_1.GetPromptsDto]),
    __metadata("design:returntype", Promise)
], PromptsController.prototype, "getPrompt", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, serialize_interceptor_1.Serialize)(prompts_dto_1.PromptsDto),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prompt_dto_1.CreatePromptDto, user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "createPrompt", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "removePrompt", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_prompt_dto_1.UpdatePromptDto,
        user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "updatePrompt", null);
PromptsController = __decorate([
    (0, common_1.Controller)('/prompts'),
    __metadata("design:paramtypes", [prompts_services_1.PromptsService])
], PromptsController);
exports.PromptsController = PromptsController;
//# sourceMappingURL=prompts.controller.js.map