import React from 'react';
import { render, screen } from '../../test/utils';
import AccessibleModal from '../AccessibleModal';
import userEvent from '@testing-library/user-event';

describe('AccessibleModal', () => {
  const mockTitle = 'Test Modal';
  const mockContent = 'Modal content';
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders modal with proper ARIA attributes', () => {
    render(
      <AccessibleModal
        isOpen={true}
        onClose={mockOnClose}
        title={mockTitle}
      >
        {mockContent}
      </AccessibleModal>
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby');

    const title = screen.getByText(mockTitle);
    expect(title).toHaveAttribute('id');
    expect(modal).toHaveAttribute('aria-labelledby', title.getAttribute('id'));
  });

  it('closes modal when clicking close button', async () => {
    render(
      <AccessibleModal
        isOpen={true}
        onClose={mockOnClose}
        title={mockTitle}
      >
        {mockContent}
      </AccessibleModal>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('closes modal when pressing Escape key', async () => {
    render(
      <AccessibleModal
        isOpen={true}
        onClose={mockOnClose}
        title={mockTitle}
      >
        {mockContent}
      </AccessibleModal>
    );

    await userEvent.keyboard('{Escape}');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus within modal when open', async () => {
    render(
      <AccessibleModal
        isOpen={true}
        onClose={mockOnClose}
        title={mockTitle}
      >
        <button>Test Button</button>
        {mockContent}
      </AccessibleModal>
    );

    const modal = screen.getByRole('dialog');
    const closeButton = screen.getByRole('button', { name: /close/i });
    const testButton = screen.getByRole('button', { name: /test button/i });

    // Focus should start on close button
    expect(closeButton).toHaveFocus();

    // Tab through elements
    await userEvent.tab();
    expect(testButton).toHaveFocus();

    // Tab should wrap back to close button
    await userEvent.tab();
    expect(closeButton).toHaveFocus();

    // Shift+Tab should wrap to test button
    await userEvent.tab({ shift: true });
    expect(testButton).toHaveFocus();
  });

  it('restores focus to trigger element when closed', async () => {
    const triggerButton = document.createElement('button');
    triggerButton.textContent = 'Open Modal';
    document.body.appendChild(triggerButton);
    triggerButton.focus();

    const { unmount } = render(
      <AccessibleModal
        isOpen={true}
        onClose={mockOnClose}
        title={mockTitle}
      >
        {mockContent}
      </AccessibleModal>
    );

    await userEvent.keyboard('{Escape}');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(triggerButton).toHaveFocus();

    unmount();
    document.body.removeChild(triggerButton);
  });

  it('does not render when isOpen is false', () => {
    render(
      <AccessibleModal
        isOpen={false}
        onClose={mockOnClose}
        title={mockTitle}
      >
        {mockContent}
      </AccessibleModal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
}); 