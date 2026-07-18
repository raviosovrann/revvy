import { Injectable } from '@nestjs/common';

@Injectable()
export class MembershipsService {
  async listByShop(shopId: string) {
    return { shopId, members: [] };
  }

  async createInvitation(shopId: string, data: Record<string, unknown>) {
    return { shopId, ...data, status: 'PENDING' };
  }

  async listInvitations(shopId: string) {
    return { shopId, invitations: [] };
  }

  async resendInvitation(shopId: string, invitationId: string) {
    return { shopId, invitationId, status: 'PENDING' };
  }

  async revokeInvitation(shopId: string, invitationId: string) {
    return { shopId, invitationId, status: 'REVOKED' };
  }

  async acceptInvitation(token: string) {
    return { token, status: 'ACCEPTED' };
  }

  async updateMember(shopId: string, memberId: string, data: Record<string, unknown>) {
    return { shopId, memberId, ...data };
  }

  async deactivateMember(shopId: string, memberId: string) {
    return { shopId, memberId, status: 'DEACTIVATED' };
  }
}
