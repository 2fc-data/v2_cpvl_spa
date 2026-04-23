import '@testing-library/jest-dom';

// Mock ResizeObserver for Recharts
// Mock ResizeObserver for Recharts
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = MockResizeObserver as any;
