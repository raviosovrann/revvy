import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../guards/roles.guard';
import { MemberRole } from '@revvy/contracts';

export const Roles = (...roles: MemberRole[]) => SetMetadata(ROLES_KEY, roles);
