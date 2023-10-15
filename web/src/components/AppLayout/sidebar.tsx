import { css, cx } from '@one-ui/styled-system/css'
import { Library, ListMusic, Mic2, Music2, User } from 'lucide-react'

import { useAuth } from 'src/auth'
import UserBudgetsCell from 'src/components/UserBudgetsCell'

import { playlists } from './playlist'

import { Button } from '@/ui/button'
import { ScrollArea } from '@/ui/scroll-area'

export const Sidebar = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { currentUser } = useAuth()

  return (
    <div className={cx(css({ pb: '3' }), className)}>
      <div className={css({ py: '4' })}>
        <UserBudgetsCell userId={currentUser.id} />
        <div className={css({ pl: '3', pr: '3', pt: '2', pb: '2' })}>
          <h2
            className={css({
              mb: '2',
              pl: '4',
              pr: '4',
              fontSize: 'lg',
              lineHeight: 'lg',
              fontWeight: 'semibold',
              letterSpacing: 'tight',
            })}
          >
            Library
          </h2>
          <div className={css({ mt: '1', mb: '1' })}>
            <Button
              variant="ghost"
              className={css({ w: 'full', justifyContent: 'flex-start' })}
            >
              <ListMusic className={css({ mr: '2', h: '4', w: '4' })} />
              Playlists
            </Button>
            <Button
              variant="ghost"
              className={css({ w: 'full', justifyContent: 'flex-start' })}
            >
              <Music2 className={css({ mr: '2', h: '4', w: '4' })} />
              Songs
            </Button>
            <Button
              variant="ghost"
              className={css({ w: 'full', justifyContent: 'flex-start' })}
            >
              <User className={css({ mr: '2', h: '4', w: '4' })} />
              Made for You
            </Button>
            <Button
              variant="ghost"
              className={css({ w: 'full', justifyContent: 'flex-start' })}
            >
              <Mic2 className={css({ mr: '2', h: '4', w: '4' })} />
              Artists
            </Button>
            <Button
              variant="ghost"
              className={css({ w: 'full', justifyContent: 'flex-start' })}
            >
              <Library className={css({ mr: '2', h: '4', w: '4' })} />
              Albums
            </Button>
          </div>
        </div>
        <div className={css({ pt: '2', pb: '2' })}>
          <h2
            className={css({
              pos: 'relative',
              pl: '7',
              pr: '7',
              fontSize: 'lg',
              lineHeight: 'lg',
              fontWeight: 'semibold',
              letterSpacing: 'tight',
            })}
          >
            Playlists
          </h2>
          <ScrollArea className={css({ h: '300px', pl: '1', pr: '1' })}>
            <div className={css({ mt: '1', mb: '1', p: '2' })}>
              {playlists?.map((playlist) => (
                <Button
                  key={`${playlist}`}
                  variant="ghost"
                  className={css({
                    w: 'full',
                    justifyContent: 'flex-start',
                    fontWeight: 'normal',
                  })}
                >
                  <ListMusic className={css({ mr: '2', h: '4', w: '4' })} />
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
