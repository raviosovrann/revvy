import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  async sendPush(userId: string, title: string, body: string, data?: Record<string, unknown>) {
    // TODO: Implement Expo push notifications
  }

  async sendSms(phone: string, message: string) {
    // TODO: Implement Twilio SMS
  }

  async sendEmail(email: string, subject: string, html: string) {
    // TODO: Implement email provider
  }
}
