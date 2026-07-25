import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, partyAId } = body;

    // 檢查必填欄位
    if (!title || !partyAId) {
      return NextResponse.json(
        { error: '缺少標題或發起人 ID' },
        { status: 400 }
      );
    }

    // ⭐ 【新增的解法：確保測試用戶存在】 (Upsert)
    // 尋找 ID 為 partyAId 的用戶，如果沒有，就立刻建立一個預設用戶
    await prisma.user.upsert({
      where: { id: partyAId },
      update: {}, // 如果存在就不做任何修改
      create: {
        id: partyAId,
        username: '測試發起人_' + Math.floor(Math.random() * 1000), // 隨機產生一個不會重複的用戶名
      },
    });

    // 在資料庫中建立新的 Dispute
    const newDispute = await prisma.dispute.create({
      data: {
        title: title,
        partyAId: partyAId,
        status: 'PENDING',

      },
    });

    return NextResponse.json(
      { message: '決鬥發起成功！', dispute: newDispute },
      { status: 201 }
    );
  } catch (error) {
    console.error('建立決鬥失敗:', error);
    return NextResponse.json(
      { error: '伺服器內部錯誤' },
      { status: 500 }
    );
  }
}