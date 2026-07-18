import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { MembershipsService } from './memberships.service';

@Controller()
@UseGuards(AuthGuard)
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get('shops/:shopId/members')
  listMembers(@Param('shopId') shopId: string) {
    return this.membershipsService.listByShop(shopId);
  }

  @Post('shops/:shopId/invitations')
  createInvitation(@Param('shopId') shopId: string, @Body() body: Record<string, unknown>) {
    return this.membershipsService.createInvitation(shopId, body);
  }

  @Get('shops/:shopId/invitations')
  listInvitations(@Param('shopId') shopId: string) {
    return this.membershipsService.listInvitations(shopId);
  }

  @Post('shops/:shopId/invitations/:id/resend')
  resendInvitation(@Param('shopId') shopId: string, @Param('id') id: string) {
    return this.membershipsService.resendInvitation(shopId, id);
  }

  @Post('shops/:shopId/invitations/:id/revoke')
  revokeInvitation(@Param('shopId') shopId: string, @Param('id') id: string) {
    return this.membershipsService.revokeInvitation(shopId, id);
  }

  @Post('invitations/:token/accept')
  acceptInvitation(@Param('token') token: string) {
    return this.membershipsService.acceptInvitation(token);
  }

  @Patch('shops/:shopId/members/:memberId')
  updateMember(
    @Param('shopId') shopId: string,
    @Param('memberId') memberId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.membershipsService.updateMember(shopId, memberId, body);
  }

  @Post('shops/:shopId/members/:memberId/deactivate')
  deactivateMember(@Param('shopId') shopId: string, @Param('memberId') memberId: string) {
    return this.membershipsService.deactivateMember(shopId, memberId);
  }
}
