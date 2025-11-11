import pygame
import random
import sys

# 초기화
pygame.init()

# 색상 정의
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
CYAN = (0, 255, 255)
BLUE = (0, 0, 255)
ORANGE = (255, 165, 0)
YELLOW = (255, 255, 0)
GREEN = (0, 255, 0)
PURPLE = (128, 0, 128)
RED = (255, 0, 0)
GRAY = (128, 128, 128)

# 게임 설정
GRID_WIDTH = 10
GRID_HEIGHT = 20
CELL_SIZE = 30
GRID_X_OFFSET = 50
GRID_Y_OFFSET = 50

# 윈도우 크기
WINDOW_WIDTH = GRID_WIDTH * CELL_SIZE + GRID_X_OFFSET * 2 + 200
WINDOW_HEIGHT = GRID_HEIGHT * CELL_SIZE + GRID_Y_OFFSET * 2

# 테트리스 조각 (테트로미노) 정의
SHAPES = [
    # I 모양
    [[1, 1, 1, 1]],
    # O 모양
    [[1, 1],
     [1, 1]],
    # T 모양
    [[0, 1, 0],
     [1, 1, 1]],
    # S 모양
    [[0, 1, 1],
     [1, 1, 0]],
    # Z 모양
    [[1, 1, 0],
     [0, 1, 1]],
    # J 모양
    [[1, 0, 0],
     [1, 1, 1]],
    # L 모양
    [[0, 0, 1],
     [1, 1, 1]]
]

SHAPE_COLORS = [CYAN, YELLOW, PURPLE, GREEN, RED, BLUE, ORANGE]

class Tetris:
    def __init__(self):
        self.grid = [[0 for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]
        self.current_piece = None
        self.current_x = 0
        self.current_y = 0
        self.current_color = None
        self.score = 0
        self.level = 1
        self.lines_cleared = 0
        self.fall_time = 0
        self.fall_speed = 500  # 밀리초
        self.game_over = False
        self.spawn_piece()
        
    def spawn_piece(self):
        """새 조각 생성"""
        shape_idx = random.randint(0, len(SHAPES) - 1)
        self.current_piece = SHAPES[shape_idx]
        self.current_color = SHAPE_COLORS[shape_idx]
        self.current_x = GRID_WIDTH // 2 - len(self.current_piece[0]) // 2
        self.current_y = 0
        
        # 게임 오버 체크
        if self.check_collision(self.current_piece, self.current_x, self.current_y):
            self.game_over = True
    
    def rotate_piece(self):
        """조각 회전"""
        if self.current_piece is None:
            return
        
        # 90도 시계방향 회전
        rotated = [[self.current_piece[j][i] 
                   for j in range(len(self.current_piece) - 1, -1, -1)]
                   for i in range(len(self.current_piece[0]))]
        
        if not self.check_collision(rotated, self.current_x, self.current_y):
            self.current_piece = rotated
    
    def check_collision(self, piece, x, y):
        """충돌 체크"""
        for i, row in enumerate(piece):
            for j, cell in enumerate(row):
                if cell:
                    board_x = x + j
                    board_y = y + i
                    
                    # 경계 체크
                    if board_x < 0 or board_x >= GRID_WIDTH or board_y >= GRID_HEIGHT:
                        return True
                    
                    # 바닥 체크
                    if board_y >= 0 and self.grid[board_y][board_x]:
                        return True
        
        return False
    
    def lock_piece(self):
        """조각을 보드에 고정"""
        for i, row in enumerate(self.current_piece):
            for j, cell in enumerate(row):
                if cell:
                    board_y = self.current_y + i
                    board_x = self.current_x + j
                    if board_y >= 0:
                        self.grid[board_y][board_x] = self.current_color
        
        self.clear_lines()
        self.spawn_piece()
    
    def clear_lines(self):
        """완성된 줄 제거"""
        lines_to_clear = []
        
        for i in range(GRID_HEIGHT):
            if all(self.grid[i]):
                lines_to_clear.append(i)
        
        for line in lines_to_clear:
            del self.grid[line]
            self.grid.insert(0, [0 for _ in range(GRID_WIDTH)])
        
        # 점수 계산
        if lines_to_clear:
            self.lines_cleared += len(lines_to_clear)
            self.score += len(lines_to_clear) * 100 * self.level
            self.level = self.lines_cleared // 10 + 1
            self.fall_speed = max(50, 500 - (self.level - 1) * 50)
    
    def move_piece(self, dx, dy):
        """조각 이동"""
        if self.current_piece is None:
            return
        
        new_x = self.current_x + dx
        new_y = self.current_y + dy
        
        if not self.check_collision(self.current_piece, new_x, new_y):
            self.current_x = new_x
            self.current_y = new_y
            return True
        return False
    
    def drop_piece(self):
        """조각을 한 칸 아래로 이동"""
        if not self.move_piece(0, 1):
            self.lock_piece()
    
    def hard_drop(self):
        """조각을 바닥까지 즉시 낙하"""
        while self.move_piece(0, 1):
            self.score += 2
        self.lock_piece()
    
    def update(self, dt):
        """게임 업데이트"""
        if self.game_over:
            return
        
        self.fall_time += dt
        if self.fall_time >= self.fall_speed:
            self.drop_piece()
            self.fall_time = 0
    
    def draw(self, screen, font):
        """게임 화면 그리기"""
        # 배경
        screen.fill(BLACK)
        
        # 그리드 그리기
        for i in range(GRID_HEIGHT):
            for j in range(GRID_WIDTH):
                x = GRID_X_OFFSET + j * CELL_SIZE
                y = GRID_Y_OFFSET + i * CELL_SIZE
                
                # 셀 그리기
                if self.grid[i][j]:
                    pygame.draw.rect(screen, self.grid[i][j],
                                   (x, y, CELL_SIZE - 1, CELL_SIZE - 1))
                else:
                    pygame.draw.rect(screen, GRAY,
                                   (x, y, CELL_SIZE - 1, CELL_SIZE - 1), 1)
        
        # 현재 조각 그리기
        if self.current_piece and not self.game_over:
            for i, row in enumerate(self.current_piece):
                for j, cell in enumerate(row):
                    if cell:
                        x = GRID_X_OFFSET + (self.current_x + j) * CELL_SIZE
                        y = GRID_Y_OFFSET + (self.current_y + i) * CELL_SIZE
                        pygame.draw.rect(screen, self.current_color,
                                       (x, y, CELL_SIZE - 1, CELL_SIZE - 1))
        
        # 정보 표시
        info_x = GRID_X_OFFSET + GRID_WIDTH * CELL_SIZE + 20
        info_y = GRID_Y_OFFSET
        
        score_text = font.render(f"점수: {self.score}", True, WHITE)
        level_text = font.render(f"레벨: {self.level}", True, WHITE)
        lines_text = font.render(f"줄: {self.lines_cleared}", True, WHITE)
        
        screen.blit(score_text, (info_x, info_y))
        screen.blit(level_text, (info_x, info_y + 30))
        screen.blit(lines_text, (info_x, info_y + 60))
        
        # 조작법 표시
        controls_y = info_y + 120
        controls = [
            "조작법:",
            "← → : 이동",
            "↑ : 회전",
            "↓ : 빠른 낙하",
            "스페이스: 하드 드롭",
            "R : 재시작"
        ]
        
        for i, text in enumerate(controls):
            control_text = font.render(text, True, WHITE)
            screen.blit(control_text, (info_x, controls_y + i * 25))
        
        # 게임 오버 메시지
        if self.game_over:
            game_over_text = font.render("게임 오버!", True, RED)
            restart_text = font.render("R 키를 눌러 재시작", True, WHITE)
            text_rect = game_over_text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 - 20))
            restart_rect = restart_text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2 + 20))
            screen.blit(game_over_text, text_rect)
            screen.blit(restart_text, restart_rect)

def main():
    screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
    pygame.display.set_caption("테트리스")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 36)
    
    game = Tetris()
    
    running = True
    while running:
        dt = clock.tick(60)
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    game.move_piece(-1, 0)
                elif event.key == pygame.K_RIGHT:
                    game.move_piece(1, 0)
                elif event.key == pygame.K_DOWN:
                    game.drop_piece()
                    game.score += 1
                elif event.key == pygame.K_UP:
                    game.rotate_piece()
                elif event.key == pygame.K_SPACE:
                    game.hard_drop()
                elif event.key == pygame.K_r:
                    game = Tetris()
        
        game.update(dt)
        game.draw(screen, font)
        pygame.display.flip()
    
    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()

