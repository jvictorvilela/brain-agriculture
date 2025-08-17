import styled from '@emotion/styled'
import { BarChart3, Leaf, Sprout, UsersRound } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const Shell = styled.div({ minHeight: '100vh' })
const Sidebar = styled.aside(({ theme }) => ({
  position: 'fixed',
  inset: '0 auto 0 0',
  zIndex: 20,
  width: 242,
  display: 'flex',
  flexDirection: 'column',
  padding: '28px 18px',
  color: '#f4fbf7',
  background: `linear-gradient(165deg, ${theme.colors.primaryDark}, #0f2f26)`,
  '@media (max-width: 800px)': { display: 'none' },
}))
const Brand = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '0 10px 34px',
})
const BrandMark = styled.div(({ theme }) => ({
  width: 42,
  height: 42,
  display: 'grid',
  placeItems: 'center',
  color: theme.colors.primaryDark,
  background: '#dcebe3',
  borderRadius: 13,
}))
const BrandTitle = styled.strong({
  display: 'block',
  fontFamily: 'Manrope, sans-serif',
  fontSize: 15,
})
const BrandSub = styled.span({
  display: 'block',
  marginTop: 2,
  color: '#9fc0b2',
  fontSize: 11,
})
const Nav = styled.nav({ display: 'grid', gap: 7 })
const NavigationLink = styled(NavLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 13px',
  color: '#b8cec5',
  borderRadius: theme.radius.sm,
  fontWeight: 600,
  transition: 'background 150ms ease, color 150ms ease',
  '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.06)' },
  '&.active': { color: '#fff', background: 'rgba(220,235,227,0.13)' },
}))
const SidebarFooter = styled.div({
  marginTop: 'auto',
  padding: 12,
  color: '#8fb0a2',
  fontSize: 11,
  lineHeight: 1.5,
})
const Main = styled.main({
  minHeight: '100vh',
  marginLeft: 242,
  padding: '38px clamp(22px, 4vw, 58px) 54px',
  '@media (max-width: 800px)': { marginLeft: 0, padding: '86px 18px 94px' },
})
const MobileHeader = styled.header(({ theme }) => ({
  position: 'fixed',
  inset: '0 0 auto',
  zIndex: 20,
  height: 68,
  display: 'none',
  alignItems: 'center',
  gap: 10,
  padding: '0 18px',
  background: 'rgba(244, 246, 241, 0.92)',
  borderBottom: `1px solid ${theme.colors.border}`,
  backdropFilter: 'blur(12px)',
  '@media (max-width: 800px)': { display: 'flex' },
}))
const MobileNav = styled.nav(({ theme }) => ({
  position: 'fixed',
  inset: 'auto 12px 12px',
  zIndex: 30,
  display: 'none',
  gridTemplateColumns: '1fr 1fr',
  padding: 7,
  background: theme.colors.primaryDark,
  borderRadius: 16,
  boxShadow: '0 14px 35px rgba(12, 38, 29, .28)',
  '@media (max-width: 800px)': { display: 'grid' },
}))
const MobileLink = styled(NavLink)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: 11,
  color: '#a9c3b8',
  borderRadius: 11,
  fontSize: 13,
  fontWeight: 700,
  '&.active': { color: '#173e32', background: '#dcebe3' },
})

const links = [
  { to: '/', label: 'Dashboard', icon: BarChart3, end: true },
  { to: '/producers', label: 'Produtores', icon: UsersRound, end: false },
]

export function AppShell() {
  return (
    <Shell>
      <Sidebar>
        <Brand>
          <BrandMark>
            <Sprout size={24} />
          </BrandMark>
          <div>
            <BrandTitle>Brain Agriculture</BrandTitle>
          </div>
        </Brand>
        <Nav>
          {links.map(({ icon: Icon, ...link }) => (
            <NavigationLink key={link.to} {...link}>
              <Icon size={19} />
              {link.label}
            </NavigationLink>
          ))}
        </Nav>
        <SidebarFooter>
        </SidebarFooter>
      </Sidebar>
      <MobileHeader>
        <BrandMark>
          <Sprout size={22} />
        </BrandMark>
        <BrandTitle>Brain Agriculture</BrandTitle>
      </MobileHeader>
      <Main>
        <Outlet />
      </Main>
      <MobileNav>
        {links.map(({ icon: Icon, ...link }) => (
          <MobileLink key={link.to} {...link}>
            <Icon size={18} />
            {link.label}
          </MobileLink>
        ))}
      </MobileNav>
    </Shell>
  )
}
