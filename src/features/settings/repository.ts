import { HttpService } from '@/services/http.service';
import type { UserSettings } from './schemas/settings.schema';

export class SettingsRepository {
  private static readonly basePath = '/settings';

  static async getSettings(): Promise<UserSettings> {
    return HttpService.get<UserSettings>(this.basePath);
  }

  static async updateSettings(data: Partial<UserSettings>): Promise<UserSettings> {
    return HttpService.patch<UserSettings>(this.basePath, data);
  }
}
