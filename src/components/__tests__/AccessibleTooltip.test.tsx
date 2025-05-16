import React from 'react';
import { render, screen, act } from '../../test/utils';
import AccessibleTooltip from '../AccessibleTooltip';
import userEvent from '@testing-library/user-event';

describe('AccessibleTooltip', () => {
  const mockContent = 'Tooltip content';
  const mockTriggerText = 'Hover me';

  it('renders trigger element with proper ARIA attributes', () => {
    render(
      <AccessibleTooltip content={mockContent}>
        <button>{mockTriggerText}</button>
      </AccessibleTooltip>
    );

    const trigger = screen.getByRole('button', { name: mockTriggerText });
    expect(trigger).toHaveAttribute('aria-describedby');
    expect(trigger).toHaveAttribute('tabIndex', '0');
  });

  it('shows tooltip on hover', async () => {
    render(
      <AccessibleTooltip content={mockContent}>
        <button>{mockTriggerText}</button>
      </AccessibleTooltip>
    );

    const trigger = screen.getByRole('button', { name: mockTriggerText });
    const tooltipId = trigger.getAttribute('aria-describedby');

    // Hover over trigger
    await userEvent.hover(trigger);

    // Wait for tooltip to appear
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute('id', tooltipId);
    expect(tooltip).toHaveTextContent(mockContent);
  });

  it('shows tooltip on focus', async () => {
    render(
      <AccessibleTooltip content={mockContent}>
        <button>{mockTriggerText}</button>
      </AccessibleTooltip>
    );

    const trigger = screen.getByRole('button', { name: mockTriggerText });
    const tooltipId = trigger.getAttribute('aria-describedby');

    // Focus trigger
    trigger.focus();

    // Wait for tooltip to appear
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute('id', tooltipId);
    expect(tooltip).toHaveTextContent(mockContent);
  });

  it('hides tooltip on blur', async () => {
    render(
      <AccessibleTooltip content={mockContent}>
        <button>{mockTriggerText}</button>
      </AccessibleTooltip>
    );

    const trigger = screen.getByRole('button', { name: mockTriggerText });

    // Focus and then blur trigger
    trigger.focus();
    trigger.blur();

    // Wait for tooltip to disappear
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', async () => {
    render(
      <AccessibleTooltip content={mockContent}>
        <button>{mockTriggerText}</button>
      </AccessibleTooltip>
    );

    const trigger = screen.getByRole('button', { name: mockTriggerText });

    // Hover and then leave
    await userEvent.hover(trigger);
    await userEvent.unhover(trigger);

    // Wait for tooltip to disappear
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('handles keyboard interaction', async () => {
    render(
      <AccessibleTooltip content={mockContent}>
        <button>{mockTriggerText}</button>
      </AccessibleTooltip>
    );

    const trigger = screen.getByRole('button', { name: mockTriggerText });

    // Focus trigger
    trigger.focus();

    // Wait for tooltip to appear
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // Press Escape
    await userEvent.keyboard('{Escape}');

    // Wait for tooltip to disappear
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('works with custom trigger element', () => {
    render(
      <AccessibleTooltip content={mockContent}>
        <div role="button" tabIndex={0}>
          {mockTriggerText}
        </div>
      </AccessibleTooltip>
    );

    const trigger = screen.getByRole('button', { name: mockTriggerText });
    expect(trigger).toHaveAttribute('aria-describedby');
    expect(trigger).toHaveAttribute('tabIndex', '0');
  });
}); 