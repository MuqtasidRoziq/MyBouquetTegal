import { NextResponse, NextRequest } from 'next/server';
import { getTestimonials, getFAQs, addTestimonial, deleteTestimonial, addFAQ, deleteFAQ } from '@/lib/storage';

export async function GET() {
  try {
    const [testimonials, faqs] = await Promise.all([getTestimonials(), getFAQs()]);
    return NextResponse.json({
      success: true,
      data: { testimonials, faqs },
    });
  } catch (error) {
    console.error('Error fetching testimonials & faqs:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (type === 'testimonial') {
      const newTestimonial = {
        id: `testi-${Date.now()}`,
        customerName: data.customerName,
        eventType: data.eventType || 'Wisuda / Hadiah',
        rating: Number(data.rating) || 5,
        comment: data.comment,
        dateText: data.dateText || 'Baru saja',
      };
      const ok = await addTestimonial(newTestimonial);
      if (!ok) {
        return NextResponse.json({ success: false, message: 'Gagal menyimpan testimoni' }, { status: 500 });
      }
      return NextResponse.json({ success: true, data: newTestimonial });
    }

    if (type === 'faq') {
      const newFAQ = {
        id: `faq-${Date.now()}`,
        question: data.question,
        answer: data.answer,
        category: data.category || 'Umum',
        sortOrder: Number(data.sortOrder) || 0,
      };
      const ok = await addFAQ(newFAQ);
      if (!ok) {
        return NextResponse.json({ success: false, message: 'Gagal menyimpan FAQ' }, { status: 500 });
      }
      return NextResponse.json({ success: true, data: newFAQ });
    }

    return NextResponse.json({ success: false, message: 'Tipe tidak valid' }, { status: 400 });
  } catch (error) {
    console.error('Error adding testimonial or faq:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id || !type) {
      return NextResponse.json({ success: false, message: 'ID dan Type diperlukan' }, { status: 400 });
    }

    let ok = false;
    if (type === 'testimonial') {
      ok = await deleteTestimonial(id);
    } else if (type === 'faq') {
      ok = await deleteFAQ(id);
    }

    if (!ok) {
      return NextResponse.json({ success: false, message: 'Gagal menghapus' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial/faq:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
