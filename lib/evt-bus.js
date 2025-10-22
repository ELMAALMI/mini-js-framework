// Learning: Observer pattern, Map data structure
export class EventBus {
  constructor() {
    this.listeners = new Map();
  }
  
  on(event, callback) {
    // Add event listener
  }
  
  emit(event, data) {
    // Trigger all listeners
  }
}