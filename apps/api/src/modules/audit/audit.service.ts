import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
  async log(event: {
    shopId?: string;
    userId?: string;
    action: string;
    resource?: string;
    resourceId?: string;
    metadata?: Record<string, unknown>;
  }) {
    // TODO: Implement audit event logging
  }
}
