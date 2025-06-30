import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CreditTransaction {
  id: string;
  amount: number;
  type: 'add' | 'deduct';
  reason: string;
  timestamp: Date;
  orderId?: string;
}

export class CreditService {
  private static readonly CREDIT_STORAGE_KEY = 'user_credits';
  private static readonly CREDIT_HISTORY_KEY = 'credit_history';
  
  // Obtener créditos del usuario
  static async getUserCredits(userId: string): Promise<number> {
    try {
      const credits = await AsyncStorage.getItem(`${this.CREDIT_STORAGE_KEY}_${userId}`);
      return credits ? parseInt(credits, 10) : 0;
    } catch (error) {
      console.error('Error obteniendo créditos del usuario:', error);
      return 0;
    }
  }

  // Establecer créditos del usuario
  static async setUserCredits(userId: string, credits: number): Promise<boolean> {
    try {
      await AsyncStorage.setItem(`${this.CREDIT_STORAGE_KEY}_${userId}`, credits.toString());
      return true;
    } catch (error) {
      console.error('Error estableciendo créditos del usuario:', error);
      return false;
    }
  }

  // Agregar créditos
  static async addCredits(userId: string, amount: number, reason: string = 'Recarga'): Promise<boolean> {
    try {
      const currentCredits = await this.getUserCredits(userId);
      const newCredits = currentCredits + amount;
      
      const success = await this.setUserCredits(userId, newCredits);
      
      if (success) {
        await this.addTransactionToHistory(userId, {
          id: Date.now().toString(),
          amount,
          type: 'add',
          reason,
          timestamp: new Date()
        });
      }
      
      return success;
    } catch (error) {
      console.error('Error agregando créditos:', error);
      return false;
    }
  }

  // Deducir créditos
  static async deductCredits(userId: string, amount: number, reason: string = 'Uso de servicio', orderId?: string): Promise<boolean> {
    try {
      const currentCredits = await this.getUserCredits(userId);
      
      if (currentCredits < amount) {
        console.warn('Créditos insuficientes');
        return false;
      }
      
      const newCredits = currentCredits - amount;
      const success = await this.setUserCredits(userId, newCredits);
      
      if (success) {
        await this.addTransactionToHistory(userId, {
          id: Date.now().toString(),
          amount,
          type: 'deduct',
          reason,
          timestamp: new Date(),
          orderId
        });
      }
      
      return success;
    } catch (error) {
      console.error('Error deduciendo créditos:', error);
      return false;
    }
  }

  // Verificar si el usuario tiene suficientes créditos
  static async hasEnoughCredits(userId: string, requiredAmount: number): Promise<boolean> {
    const currentCredits = await this.getUserCredits(userId);
    return currentCredits >= requiredAmount;
  }

  // Obtener historial de transacciones
  static async getCreditHistory(userId: string): Promise<CreditTransaction[]> {
    try {
      const history = await AsyncStorage.getItem(`${this.CREDIT_HISTORY_KEY}_${userId}`);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error obteniendo historial de créditos:', error);
      return [];
    }
  }

  // Agregar transacción al historial
  private static async addTransactionToHistory(userId: string, transaction: CreditTransaction): Promise<void> {
    try {
      const currentHistory = await this.getCreditHistory(userId);
      const newHistory = [transaction, ...currentHistory].slice(0, 100); // Mantener solo las últimas 100 transacciones
      
      await AsyncStorage.setItem(`${this.CREDIT_HISTORY_KEY}_${userId}`, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error agregando transacción al historial:', error);
    }
  }

  // Inicializar créditos para nuevo transportista (5 créditos iniciales)
  static async initializeTransportistCredits(userId: string): Promise<boolean> {
    try {
      const currentCredits = await this.getUserCredits(userId);
      
      // Solo inicializar si no tiene créditos
      if (currentCredits === 0) {
        return await this.addCredits(userId, 5, 'Créditos iniciales de bienvenida');
      }
      
      return true;
    } catch (error) {
      console.error('Error inicializando créditos de transportista:', error);
      return false;
    }
  }

  // Simular recarga de créditos (para demostración)
  static async simulateRecharge(userId: string, amount: number): Promise<boolean> {
    return await this.addCredits(userId, amount, `Recarga simulada de ${amount} créditos`);
  }
}
