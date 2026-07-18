import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'STARTER', featureKey: 'max_employees' } },
    update: {},
    create: { planName: 'STARTER', featureKey: 'max_employees', limitValue: 2, enabled: true },
  });

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'STARTER', featureKey: 'estimates' } },
    update: {},
    create: { planName: 'STARTER', featureKey: 'estimates', enabled: false },
  });

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'STARTER', featureKey: 'online_payments' } },
    update: {},
    create: { planName: 'STARTER', featureKey: 'online_payments', enabled: false },
  });

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'GROWTH', featureKey: 'max_employees' } },
    update: {},
    create: { planName: 'GROWTH', featureKey: 'max_employees', limitValue: 8, enabled: true },
  });

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'GROWTH', featureKey: 'estimates' } },
    update: {},
    create: { planName: 'GROWTH', featureKey: 'estimates', enabled: true },
  });

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'GROWTH', featureKey: 'online_payments' } },
    update: {},
    create: { planName: 'GROWTH', featureKey: 'online_payments', enabled: true },
  });

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'PRO', featureKey: 'max_employees' } },
    update: {},
    create: { planName: 'PRO', featureKey: 'max_employees', limitValue: null, enabled: true },
  });

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'PRO', featureKey: 'estimates' } },
    update: {},
    create: { planName: 'PRO', featureKey: 'estimates', enabled: true },
  });

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'PRO', featureKey: 'online_payments' } },
    update: {},
    create: { planName: 'PRO', featureKey: 'online_payments', enabled: true },
  });

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'PRO', featureKey: 'advanced_analytics' } },
    update: {},
    create: { planName: 'PRO', featureKey: 'advanced_analytics', enabled: true },
  });

  await prisma.planEntitlement.upsert({
    where: { planName_featureKey: { planName: 'PRO', featureKey: 'custom_permissions' } },
    update: {},
    create: { planName: 'PRO', featureKey: 'custom_permissions', enabled: true },
  });

  console.log('Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
