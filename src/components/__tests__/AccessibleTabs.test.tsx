import React from 'react';
import { render, screen } from '../../test/utils';
import AccessibleTabs from '../AccessibleTabs';
import userEvent from '@testing-library/user-event';

describe('AccessibleTabs', () => {
  const mockTabs = [
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content 3' }
  ];

  it('renders tabs with proper ARIA attributes', () => {
    render(<AccessibleTabs tabs={mockTabs} />);

    const tabList = screen.getByRole('tablist');
    expect(tabList).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(mockTabs.length);

    tabs.forEach((tab, index) => {
      expect(tab).toHaveAttribute('aria-selected', index === 0 ? 'true' : 'false');
      expect(tab).toHaveAttribute('aria-controls', `panel-${mockTabs[index].id}`);
      expect(tab).toHaveAttribute('id', `tab-${mockTabs[index].id}`);
    });

    const panels = screen.getAllByRole('tabpanel');
    expect(panels).toHaveLength(mockTabs.length);

    panels.forEach((panel, index) => {
      expect(panel).toHaveAttribute('aria-labelledby', `tab-${mockTabs[index].id}`);
      expect(panel).toHaveAttribute('id', `panel-${mockTabs[index].id}`);
      expect(panel).toHaveAttribute('hidden', index === 0 ? undefined : '');
    });
  });

  it('switches tabs on click', async () => {
    render(<AccessibleTabs tabs={mockTabs} />);

    const tabs = screen.getAllByRole('tab');
    const panels = screen.getAllByRole('tabpanel');

    // Click second tab
    await userEvent.click(tabs[1]);

    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');

    expect(panels[0]).toHaveAttribute('hidden', '');
    expect(panels[1]).not.toHaveAttribute('hidden');
    expect(panels[2]).toHaveAttribute('hidden', '');
  });

  it('handles keyboard navigation', async () => {
    render(<AccessibleTabs tabs={mockTabs} />);

    const tabs = screen.getAllByRole('tab');
    const panels = screen.getAllByRole('tabpanel');

    // Focus first tab
    tabs[0].focus();

    // Test arrow right navigation
    await userEvent.keyboard('{ArrowRight}');
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(panels[1]).not.toHaveAttribute('hidden');

    // Test arrow left navigation
    await userEvent.keyboard('{ArrowLeft}');
    expect(tabs[0]).toHaveFocus();
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(panels[0]).not.toHaveAttribute('hidden');

    // Test Home key
    await userEvent.keyboard('{Home}');
    expect(tabs[0]).toHaveFocus();
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    // Test End key
    await userEvent.keyboard('{End}');
    expect(tabs[2]).toHaveFocus();
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    expect(panels[2]).not.toHaveAttribute('hidden');
  });

  it('maintains focus management', async () => {
    render(<AccessibleTabs tabs={mockTabs} />);

    const tabs = screen.getAllByRole('tab');
    const panels = screen.getAllByRole('tabpanel');

    // Focus first tab
    tabs[0].focus();

    // Test tab key navigation
    await userEvent.tab();
    expect(panels[0]).toHaveFocus();

    // Test shift+tab navigation
    await userEvent.tab({ shift: true });
    expect(tabs[0]).toHaveFocus();
  });

  it('handles disabled tabs', async () => {
    const tabsWithDisabled = [
      { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
      { id: 'tab2', label: 'Tab 2', content: 'Content 2', disabled: true },
      { id: 'tab3', label: 'Tab 3', content: 'Content 3' }
    ];

    render(<AccessibleTabs tabs={tabsWithDisabled} />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-disabled', 'true');
    expect(tabs[1]).toBeDisabled();

    // Try to click disabled tab
    await userEvent.click(tabs[1]);
    expect(tabs[1]).not.toHaveAttribute('aria-selected', 'true');

    // Try to focus disabled tab with keyboard
    tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(tabs[2]).toHaveFocus(); // Should skip disabled tab
  });
}); 