import { Injectable, OnModuleDestroy } from '@nestjs/common';

interface BlacklistedTokenEntry {
  expiresAtEpochSeconds: number;
}

// Service cho blacklist token
@Injectable()
export class TokenBlacklistService implements OnModuleDestroy {
  private readonly revokedTokenIdToEntry = new Map<string, BlacklistedTokenEntry>();
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.cleanupTimer = setInterval(() => this.evictExpired(), 60_000);
  }

  /**
   * Thu hồi token
   * @param jti 
   * @param expiresAtEpochSeconds 
   */
  revoke(jti: string, expiresAtEpochSeconds: number): void {
    this.revokedTokenIdToEntry.set(jti, { expiresAtEpochSeconds });
  }

  /**
   * Kiểm tra token có bị thu hồi không
   * @param jti 
   * @returns 
   */
  isRevoked(jti: string): boolean {
    const entry = this.revokedTokenIdToEntry.get(jti);
    if (!entry) return false;
    const now = Math.floor(Date.now() / 1000);
    if (entry.expiresAtEpochSeconds <= now) {
      this.revokedTokenIdToEntry.delete(jti);
      return false;
    }
    return true;
  }

  /**
   * Xóa token hết hạn
   */
  private evictExpired(): void {
    const now = Math.floor(Date.now() / 1000);
    for (const [jti, entry] of this.revokedTokenIdToEntry.entries()) {
      if (entry.expiresAtEpochSeconds <= now) this.revokedTokenIdToEntry.delete(jti);
    }
  }

  /**
   * Xóa timer
   */
  onModuleDestroy(): void {
    if (this.cleanupTimer) clearInterval(this.cleanupTimer);
  }
}


