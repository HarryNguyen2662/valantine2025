/**
 * Gallery kỉ niệm + lời chúc Valentine
 * Chỉnh sửa file này để thêm ảnh, caption, ngày và lời chúc.
 */

export interface MemoryPhoto {
  id: string;
  src: string;        // đường dẫn ảnh trong /public (vd: /gallery/photo_1.jpg)
  date: string;       // "18.05.2023"
  title: string;      // "First Date"
  description: string;
}

/** Lời nói ngọt ngào từng bước (click/chạm để xem tiếp) */
export interface ValentineConfig {
  /** Tên hiển thị trên intro (vd: tên hai bạn) */
  coupleNames: string;
  /** Ngày bắt đầu đếm (YYYY-MM-DD) */
  togetherSince: string;
  /** Lời intro từng bước — mỗi lần chạm hiện dòng tiếp */
  introLines: string[];
  /** Các ảnh trong gallery kỉ niệm */
  gallery: MemoryPhoto[];
  /** Lời chúc Valentine (có thể nhiều đoạn) */
  wishes: string[];
  /** Dòng kết (vd: "Forever yours") */
  closing: string;
  /** Dòng ký tên cuối (vd: "Kiều Anh, anh yêu em. — Phúc Toàn ♡") */
  signOff?: string;
}

export const valentineConfig: ValentineConfig = {
  coupleNames: "Phúc Toàn & Kiều Anh",
  togetherSince: "2025-08-20", // 20 tháng 8, 2025
  introLines: [
    "Kiều Anh à...",
    "Từ ngày 20.08.2025, mỗi khoảnh khắc bên em đều là quà.",
    "Anh gom lại từng kỉ niệm — First 5 Days, Long Distance, Chicago, New York, Beloit...",
    "Để em xem lại những gì hai đứa mình đã đi qua.",
    "Đây là gallery nhỏ của chúng ta.",
    "Chạm để mở — Phúc Toàn ♡",
  ],
  gallery: [
    {
      id: "1",
      src: "/gallery/photo_1.jpg",
      date: "18.05.2023",
      title: "Ngày đầu tiên",
      description: "Ngày câu chuyện của chúng ta bắt đầu.",
    },
    {
      id: "2",
      src: "/gallery/photo_2.jpg",
      date: "14.02.2024",
      title: "Valentine đầu tiên",
      description: "Kỉ niệm đầu tiên cùng nhau.",
    },
    {
      id: "3",
      src: "/gallery/photo_3.jpg",
      date: "01.06.2024",
      title: "Một chuyến đi",
      description: "Những khoảnh khắc bên nhau.",
    },
    {
      id: "4",
      src: "/gallery/photo_4.jpg",
      date: "15.08.2024",
      title: "Kỉ niệm đáng nhớ",
      description: "Mãi nhớ từng khoảnh khắc.",
    },
    {
      id: "5",
      src: "/gallery/photo_5.jpg",
      date: "20.10.2024",
      title: "Mùa thu cùng nhau",
      description: "Lá vàng và những câu chuyện.",
    },
    {
      id: "6",
      src: "/gallery/photo_6.jpg",
      date: "31.12.2024",
      title: "Đón năm mới",
      description: "Cùng nhau đón năm mới.",
    },
  ],
  wishes: [
    "Valentine này và mọi Valentine sau này, anh mong chúng ta vẫn luôn là nơi trở về của nhau — dù có lúc vấp ngã, có lúc lỡ làm nhau tổn thương.",
    "267 khoảnh khắc trong gallery này không phải toàn là hoàn hảo, nhưng mỗi bức ảnh đều là bằng chứng rằng chúng ta đã chọn ở lại. Chọn lắng nghe thêm một chút. Chọn thương nhau nhiều hơn giận hờn.",
    "Bọn mình vẫn đang học cách yêu đúng cách — học cách nói lời xin lỗi, học cách tha thứ, học cách hiểu nhau qua những sai lầm. Và anh biết con đường phía trước vẫn còn nhiều thử thách, nhưng anh muốn cùng em đi hết con đường đó.",
    "Cảm ơn em đã kiên nhẫn với anh. Cảm ơn em đã không bỏ cuộc ngay cả khi khó khăn nhất.",
    "Chúc chúng ta một Valentine chân thành — và một gallery còn dài thêm mãi, với nhiều tiếng cười hơn nước mắt.",
  ],
  closing: "Forever learning to love you better — Valentine 2026",
  signOff: "Kiều Anh, anh yêu em. — Phúc Toàn ♡",
};
