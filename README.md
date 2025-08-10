# KT CheckPoints Lora Management

Hệ thống quản lý checkpoint và Lora models cho Stable Diffusion và Flux image generation models. Mỗi model sẽ có nhiều checkpoint khác nhau và có nhiều Lora khác nhau. Dự án cũng giúp quản lý các workflow tạo ảnh cho ComfyUI.

## Chức năng chính

- **Quản lý Models**: Thêm, xóa, sửa các model Stable Diffusion và Flux
- **Quản lý Checkpoints**: Thêm, xóa, sửa checkpoint cho từng model
- **Quản lý Lora**: Thêm, xóa, sửa Lora models cho từng model
- **Quản lý Workflows**: Quản lý các workflow ComfyUI
- **File Upload**: Hỗ trợ upload file checkpoint và lưu trữ thông tin
- **Tag System**: Hệ thống tag để phân loại checkpoint và Lora
- **Tìm kiếm**: Tìm kiếm theo tên, tag trong từng model

## Công nghệ sử dụng

### Backend
- **NestJS 11** với TypeScript
- **TypeORM** cho database operations
- **PostgreSQL** database
- **JWT Authentication** với Passport
- **Swagger** cho API documentation
- **Class-validator** cho validation
- **Multer** cho file uploads

### Frontend
- **Vue 3** với Composition API
- **TailwindCSS** cho styling
- **Vue Router 4** cho routing
- **Pinia** cho state management
- **AOS** cho animations
- **Vite** cho build tool

## Cấu trúc dự án

```
KT_CheckPoints_Lora_Management/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   ├── common/         # Shared utilities
│   │   ├── config/         # Configuration
│   │   └── main.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Vue 3 Frontend
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── views/          # Page components
│   │   ├── router/         # Vue Router
│   │   ├── stores/         # Pinia stores
│   │   ├── composables/    # Vue composables
│   │   └── main.js         # Entry point
│   ├── package.json
│   └── vite.config.js
├── package.json             # Root package.json
└── README.md
```

## Cài đặt và chạy

### Cài đặt tất cả dependencies
```bash
npm run install:all
```

### Chạy development mode (cả backend và frontend)
```bash
npm run dev
```

### Chạy riêng lẻ

#### Backend
```bash
npm run dev:backend
```

#### Frontend
```bash
npm run dev:frontend
```

### Build production
```bash
npm run build
```

### Chạy production
```bash
npm run start
```

### Linting và Formatting
```bash
# Lint tất cả
npm run lint

# Format tất cả
npm run format

# Clean build files
npm run clean
```

## Scripts có sẵn

| Script | Mô tả |
|--------|-------|
| `npm run dev` | Chạy cả backend và frontend trong development mode |
| `npm run dev:backend` | Chạy chỉ backend trong development mode |
| `npm run dev:frontend` | Chạy chỉ frontend trong development mode |
| `npm run build` | Build cả backend và frontend |
| `npm run start` | Chạy production mode |
| `npm run install:all` | Cài đặt dependencies cho tất cả |
| `npm run lint` | Chạy linting cho tất cả |
| `npm run format` | Format code cho tất cả |
| `npm run clean` | Xóa build files |

## Ports

- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:3000

## Tính năng đã hoàn thành

- [x] Cài đặt NestJS backend với TypeScript
- [x] Cài đặt Vue 3 frontend với TailwindCSS
- [x] Giao diện đăng nhập và đăng ký
- [x] Routing và navigation guards
- [x] Basic dashboard
- [x] Cài đặt tất cả thư viện cần thiết cho NestJS
- [x] Thiết lập scripts để chạy cả dự án từ thư mục gốc

## Tính năng sắp tới

- [ ] API endpoints cho authentication
- [ ] Database models và migrations
- [ ] CRUD operations cho Models, CheckPoints, Lora
- [ ] File upload system
- [ ] Search và filter functionality
- [ ] Workflow management
- [ ] User management
- [ ] Dashboard với statistics, sidebar, footer
- [ ] User menu và avatar

## UI/UX Design

- **Theme**: Modern, minimalist với màu đen trắng
- **Typography**: Inter font family
- **Animations**: AOS (Animate On Scroll) với smooth transitions
- **Icons**: Custom SVG icons
- **Responsive**: Mobile-first design
- **Transitions**: Page transitions và smooth animations

## Development

### Backend Development
```bash
cd backend
npm run start:dev
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Database
- PostgreSQL database
- TypeORM migrations
- Seeders cho test data

### Testing
- Jest cho unit tests
- E2E testing
- API testing với Supertest

## Deployment

- Docker containerization
- Environment configuration
- Production build optimization
- Health checks và monitoring

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License
