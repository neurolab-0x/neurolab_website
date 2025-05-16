import React from 'react';
import { render, screen, fireEvent, act } from '../../test/utils';
import AccessibleNav from '../AccessibleNav';
import userEvent from '@testing-library/user-event';

const mockItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

describe('AccessibleNav', () => {
  it('renders navigation with proper ARIA attributes', () => {
    render(<AccessibleNav items={mockItems} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'main-menu');
    expect(button).toHaveAttribute('aria-haspopup', 'true');
  });

  it('opens menu on button click', async () => {
    render(<AccessibleNav items={mockItems} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(mockItems.length);
  });

  it('handles keyboard navigation', async () => {
    render(<AccessibleNav items={mockItems} />);

    // Open menu
    const button = screen.getByRole('button');
    await userEvent.click(button);

    const menuItems = screen.getAllByRole('menuitem');

    // Test arrow down navigation
    await userEvent.keyboard('{ArrowDown}');
    expect(menuItems[0]).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(menuItems[1]).toHaveFocus();

    // Test arrow up navigation
    await userEvent.keyboard('{ArrowUp}');
    expect(menuItems[0]).toHaveFocus();

    // Test Home key
    await userEvent.keyboard('{Home}');
    expect(menuItems[0]).toHaveFocus();

    // Test End key
    await userEvent.keyboard('{End}');
    expect(menuItems[2]).toHaveFocus();

    // Test Escape key
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes menu when clicking outside', async () => {
    render(<AccessibleNav items={mockItems} />);

    // Open menu
    const button = screen.getByRole('button');
    await userEvent.click(button);

    // Click outside
    await userEvent.click(document.body);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('maintains focus management', async () => {
    render(<AccessibleNav items={mockItems} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems[0]).toHaveFocus();

    await userEvent.tab();
    expect(menuItems[1]).toHaveFocus();
  });
}); 