# ShopMini — Bài Thực Hành 03

Ứng dụng cửa hàng trực tuyến **ShopMini** xây dựng bằng **React + TypeScript (Vite)**, kết hợp **React Router**, **Context API**, và **Redux Toolkit**.

## Chức năng chính
- **Trang chủ (`/`)**: Lấy danh sách sản phẩm từ FakeStore API, tìm kiếm theo tên, hiển thị lưới responsive (1 cột mobile, 2 cột tablet, 4 cột desktop).
- **Chi tiết sản phẩm (`/products/:id`)**: Xem mô tả đầy đủ và thêm sản phẩm vào giỏ hàng.
- **Giỏ hàng (`/cart`)**: Tăng/giảm số lượng, xóa từng sản phẩm, xóa toàn bộ giỏ, tự động tính tổng số lượng và tổng tiền.
- **Đăng nhập (`/login`)**: Xác thực giả lập (mật khẩu đúng: `123456`), tự động chuyển về trang trước đó sau khi đăng nhập.
- **Thanh toán (`/checkout`)**: Route được bảo vệ (`ProtectedRoute`), nhập thông tin giao hàng, bấm **Đặt hàng** để xóa giỏ và hiển thị thông báo thành công.
- **Trang 404 (`*`)**: Xử lý đường dẫn không hợp lệ.
- **Theme Sáng/Tối**: Chuyển đổi giao diện toàn ứng dụng và lưu trạng thái vào `localStorage`.

## Kiến trúc quản lý State: `useState` vs `Context API` vs `Redux Toolkit`

| Dữ liệu | Công cụ lưu trữ | Lý do lựa chọn |
| :--- | :--- | :--- |
| Từ khóa tìm kiếm (`searchTerm`), dữ liệu form đăng nhập/thanh toán (`username`, `password`, `fullName`, `phone`, `address`), lỗi validation, trạng thái phản hồi nút bấm (`addedFeedback`), hóa đơn sau khi đặt (`receipt`) | **`useState`** (Local State) | Dữ liệu chỉ phục vụ nội bộ trong một component/trang cụ thể, vòng đời ngắn, không có component khác cần đọc hoặc chia sẻ. Giữ tại local giúp tránh làm phình global store và hạn chế re-render không cần thiết. |
| Giao diện sáng/tối (`theme`, `toggleTheme`) và thông tin đăng nhập (`user`, `login`, `logout`) | **`Context API`** (`ThemeContext`, `AuthContext`) | Dữ liệu cần chia sẻ ở nhiều tầng component (`Header`, `ProtectedRoute`, `LoginPage`, `CheckoutPage`) để tránh prop drilling, nhưng **tần suất thay đổi rất thấp** (chỉ khi người dùng đổi theme hoặc đăng nhập/đăng xuất) và logic cập nhật đơn giản. |
| Danh sách sản phẩm + trạng thái gọi API (`items`, `status`, `error`) và Giỏ hàng (`items`, tổng số lượng, tổng tiền) | **`Redux Toolkit`** (`productsSlice`, `cartSlice`) | **Sản phẩm**: cần quản lý tác vụ bất đồng bộ với `createAsyncThunk` (xử lý rõ ràng 3 trạng thái `loading`, `succeeded`, `failed`) và cache dữ liệu dùng chung giữa `HomePage` và `ProductDetailPage`.<br>**Giỏ hàng**: nghiệp vụ cập nhật phức tạp (`addToCart`, `updateQuantity`, `removeFromCart`, `clearCart`), cập nhật thường xuyên từ nhiều trang (`HomePage`, `ProductDetailPage`, `CartPage`, `CheckoutPage`) và cần **selector** tính toán tổng số lượng/tổng tiền đồng bộ theo thời gian thực trên `Header` và `CartPage`. |

## Cách chạy dự án

```bash
npm install
npm run dev